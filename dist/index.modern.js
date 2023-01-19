import { useState, useRef, useCallback, useEffect } from 'react';

const easing = {
  easeInOutCubic: x => {
    if (x >= 1) return 1;
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  },
  easeOutCirc: x => {
    if (x >= 1) return 1;
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  },
  easeOutQuint: x => {
    if (x >= 1) return 1;
    return 1 - Math.pow(1 - x, 5);
  },
  easeOutExpo: x => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }
};

const useAnimateNumber = ({
  number: _number = 0,
  durationInMs: _durationInMs = 4000,
  decimalPlaces: _decimalPlaces = 0,
  easingFunctionName: _easingFunctionName = "easeOutExpo",
  setInitialValue: _setInitialValue = false,
  debug: _debug = false
}) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [originalNumber, setOriginalNumber] = useState(_setInitialValue ? _number : 0);
  const [currentTarget, setCurrentTarget] = useState(0);
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    currentNumber: 0,
    originalNumber: _setInitialValue ? _number : 0,
    step: 0,
    isGoingUp: false,
    isAnimating: false
  });
  const requestRef = useRef();
  const mountedRef = useRef(true);
  const previousTimeRef = useRef();
  const animate = useCallback(time => {
    if (!mountedRef.current) return;

    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    const reset = () => {
      setData({
        currentNumber: _number,
        originalNumber: _number,
        step: 0,
        isGoingUp: false,
        isAnimating: false
      });
      previousTimeRef.current = undefined;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    };

    if (typeof _number !== "number") {
      try {
        _number = parseFloat(_number);
      } catch (e) {
        console.error("useAnimateNumber: number is not a number");
        reset();
        return;
      }
    }

    if (_number === data.currentNumber) {
      reset();
      return;
    }

    const deltaTime = time - previousTimeRef.current;
    console.log("deltaTime", deltaTime, _durationInMs);

    if (deltaTime >= _durationInMs) {
      reset();
      return;
    }

    let easingFunction = easing.easeOutExpo;

    if (_easingFunctionName && easing[_easingFunctionName]) {
      easingFunction = easing[_easingFunctionName];
    }

    const progress = deltaTime / _durationInMs;
    const percentageOfTargetValue = easingFunction(progress);
    let currentValue = percentageOfTargetValue * _number;
    setData(previousData => {
      const isGoingUp = _number > previousData.originalNumber;

      if (!isGoingUp) {
        currentValue = (1 - percentageOfTargetValue) * previousData.originalNumber + _number;
      }

      if (currentValue !== 0) {
        currentValue = parseFloat(currentValue.toFixed(_decimalPlaces));
      }

      if (isGoingUp && currentValue > _number) {
        currentValue = _number;
      }

      if (!isGoingUp && currentValue < _number) {
        currentValue = _number;
      }

      return { ...previousData,
        currentNumber: currentValue,
        isGoingUp,
        isAnimating: true
      };
    });
    requestRef.current = window.requestAnimationFrame(animate);
  }, [_number, _durationInMs, _decimalPlaces, _easingFunctionName]);
  useEffect(() => {
    requestRef.current = window.requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [_number]);
  return {
    number: data.currentNumber,
    isGoingUp: data.isGoingUp,
    isAnimating: data.isAnimating
  };
};

export default useAnimateNumber;
//# sourceMappingURL=index.modern.js.map
