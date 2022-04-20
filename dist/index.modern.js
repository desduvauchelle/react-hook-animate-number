import { useState, useEffect } from 'react';

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

const FPS = 60;

const useAnimateNumber = ({
  number: _number = 0,
  durationInMs: _durationInMs = 4000,
  decimalPlaces: _decimalPlaces = 0,
  easingFunctionName: _easingFunctionName = "easeOutExpo"
}) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [originalNumber, setOriginalNumber] = useState(0);
  const [currentTarget, setCurrentTarget] = useState(0);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (_number === originalNumber) return;
    let mounted = true;

    if (step > 0 && currentTarget !== _number) {
      setOriginalNumber(currentNumber);
      setStep(0);
    }

    let isGoingUp = _number > originalNumber;
    const numberOfSteps = Math.round(1000 / FPS * _durationInMs / 1000);
    const progress = (step + 1) / numberOfSteps;
    let easingFunction = easing.easeOutExpo;

    if (_easingFunctionName && easing[_easingFunctionName]) {
      easingFunction = easing[_easingFunctionName];
    }

    const percentageOfTargetValue = easingFunction(progress);
    let currentValue = percentageOfTargetValue * _number;

    if (!isGoingUp) {
      currentValue = (1 - percentageOfTargetValue) * originalNumber + _number;
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

    if (step === numberOfSteps || currentValue === _number) {
      setOriginalNumber(_number);
      setCurrentNumber(_number);
      setStep(0);
      return;
    }

    setTimeout(() => {
      if (mounted) {
        setCurrentTarget(_number);
        setStep(step + 1);
        setCurrentNumber(currentValue);
      }
    }, 1000 / FPS);
    return () => {
      mounted = false;
    };
  }, [_number, originalNumber, currentNumber, step]);
  return {
    number: currentNumber,
    isGoingUp: _number > originalNumber,
    isAnimating: _number !== originalNumber
  };
};

export default useAnimateNumber;
//# sourceMappingURL=index.modern.js.map
