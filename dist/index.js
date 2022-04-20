var react = require('react');

var easing = {
  easeInOutCubic: function easeInOutCubic(x) {
    if (x >= 1) return 1;
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  },
  easeOutCirc: function easeOutCirc(x) {
    if (x >= 1) return 1;
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  },
  easeOutQuint: function easeOutQuint(x) {
    if (x >= 1) return 1;
    return 1 - Math.pow(1 - x, 5);
  },
  easeOutExpo: function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }
};

var FPS = 60;

var useAnimateNumber = function useAnimateNumber(_ref) {
  var _ref$number = _ref.number,
      number = _ref$number === void 0 ? 0 : _ref$number,
      _ref$durationInMs = _ref.durationInMs,
      durationInMs = _ref$durationInMs === void 0 ? 4000 : _ref$durationInMs,
      _ref$decimalPlaces = _ref.decimalPlaces,
      decimalPlaces = _ref$decimalPlaces === void 0 ? 0 : _ref$decimalPlaces,
      _ref$easingFunctionNa = _ref.easingFunctionName,
      easingFunctionName = _ref$easingFunctionNa === void 0 ? "easeOutExpo" : _ref$easingFunctionNa;

  var _useState = react.useState(0),
      currentNumber = _useState[0],
      setCurrentNumber = _useState[1];

  var _useState2 = react.useState(0),
      originalNumber = _useState2[0],
      setOriginalNumber = _useState2[1];

  var _useState3 = react.useState(0),
      currentTarget = _useState3[0],
      setCurrentTarget = _useState3[1];

  var _useState4 = react.useState(0),
      step = _useState4[0],
      setStep = _useState4[1];

  react.useEffect(function () {
    if (number === originalNumber) return;
    var mounted = true;

    if (step > 0 && currentTarget !== number) {
      setOriginalNumber(currentNumber);
      setStep(0);
    }

    var isGoingUp = number > originalNumber;
    var numberOfSteps = Math.round(1000 / FPS * durationInMs / 1000);
    var progress = (step + 1) / numberOfSteps;
    var easingFunction = easing.easeOutExpo;

    if (easingFunctionName && easing[easingFunctionName]) {
      easingFunction = easing[easingFunctionName];
    }

    var percentageOfTargetValue = easingFunction(progress);
    var currentValue = percentageOfTargetValue * number;

    if (!isGoingUp) {
      currentValue = (1 - percentageOfTargetValue) * originalNumber + number;
    }

    if (currentValue !== 0) {
      currentValue = parseFloat(currentValue.toFixed(decimalPlaces));
    }

    if (isGoingUp && currentValue > number) {
      currentValue = number;
    }

    if (!isGoingUp && currentValue < number) {
      currentValue = number;
    }

    if (step === numberOfSteps || currentValue === number) {
      setOriginalNumber(number);
      setCurrentNumber(number);
      setStep(0);
      return;
    }

    setTimeout(function () {
      if (mounted) {
        setCurrentTarget(number);
        setStep(step + 1);
        setCurrentNumber(currentValue);
      }
    }, 1000 / FPS);
    return function () {
      mounted = false;
    };
  }, [number, originalNumber, currentNumber, step]);
  return {
    number: currentNumber,
    isGoingUp: number > originalNumber,
    isAnimating: number !== originalNumber
  };
};

module.exports = useAnimateNumber;
//# sourceMappingURL=index.js.map
