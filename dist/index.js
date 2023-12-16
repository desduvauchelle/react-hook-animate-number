var react = require('react');

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

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

function applyThousandSeparator(value, thousandSeparator) {
  var thousandsGroupRegex = /(\d)(?=(\d{3})+(?!\d))/g;
  var index = value.search(/[1-9]/);
  index = index === -1 ? value.length : index;
  return value.substring(0, index) + value.substring(index, value.length).replace(thousandsGroupRegex, '$1' + thousandSeparator);
}

var useAnimateNumber = function useAnimateNumber(_ref) {
  var _ref$number = _ref.number,
    number = _ref$number === void 0 ? 0 : _ref$number,
    _ref$durationInMs = _ref.durationInMs,
    durationInMs = _ref$durationInMs === void 0 ? 4000 : _ref$durationInMs,
    _ref$decimalPlaces = _ref.decimalPlaces,
    decimalPlaces = _ref$decimalPlaces === void 0 ? 0 : _ref$decimalPlaces,
    _ref$thousandSeparato = _ref.thousandSeparator,
    thousandSeparator = _ref$thousandSeparato === void 0 ? ',' : _ref$thousandSeparato,
    _ref$easingFunctionNa = _ref.easingFunctionName,
    easingFunctionName = _ref$easingFunctionNa === void 0 ? "easeOutExpo" : _ref$easingFunctionNa,
    _ref$setInitialValue = _ref.setInitialValue,
    setInitialValue = _ref$setInitialValue === void 0 ? false : _ref$setInitialValue;
  var _useState = react.useState(0);
  var _useState2 = react.useState(setInitialValue ? number : 0);
  var _useState3 = react.useState(0);
  var _useState4 = react.useState(0);
  var _useState5 = react.useState({
      currentNumber: 0,
      originalNumber: setInitialValue ? number : 0,
      step: 0,
      isGoingUp: false,
      isAnimating: false
    }),
    data = _useState5[0],
    setData = _useState5[1];
  var requestRef = react.useRef();
  var mountedRef = react.useRef(true);
  var previousTimeRef = react.useRef();
  var animate = react.useCallback(function (time) {
    if (!mountedRef.current) return;
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
      return;
    }
    var reset = function reset() {
      setData({
        currentNumber: number,
        originalNumber: number,
        step: 0,
        isGoingUp: false,
        isAnimating: false
      });
      previousTimeRef.current = undefined;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    };
    if (typeof number !== "number") {
      try {
        number = parseFloat(number);
      } catch (e) {
        console.error("useAnimateNumber: number is not a number");
        reset();
        return;
      }
    }
    if (number === data.currentNumber) {
      reset();
      return;
    }
    var deltaTime = time - previousTimeRef.current;
    if (deltaTime >= durationInMs) {
      reset();
      return;
    }
    var easingFunction = easing.easeOutExpo;
    if (easingFunctionName && easing[easingFunctionName]) {
      easingFunction = easing[easingFunctionName];
    }
    var progress = deltaTime / durationInMs;
    var percentageOfTargetValue = easingFunction(progress);
    var currentValue = percentageOfTargetValue * number;
    setData(function (previousData) {
      var isGoingUp = number > previousData.originalNumber;
      if (!isGoingUp) {
        currentValue = (1 - percentageOfTargetValue) * previousData.originalNumber + number;
      }
      if (currentValue !== 0) {
        currentValue = parseFloat(currentValue.toFixed(decimalPlaces));
      }
      if (thousandSeparator !== null) {
        currentValue = parseFloat(applyThousandSeparator(currentValue.toString(), thousandSeparator));
      }
      if (isGoingUp && currentValue > number) {
        currentValue = number;
      }
      if (!isGoingUp && currentValue < number) {
        currentValue = number;
      }
      return _extends({}, previousData, {
        currentNumber: currentValue,
        isGoingUp: isGoingUp,
        isAnimating: true
      });
    });
    requestRef.current = window.requestAnimationFrame(animate);
  }, [number, durationInMs, decimalPlaces, easingFunctionName]);
  react.useEffect(function () {
    requestRef.current = window.requestAnimationFrame(animate);
    return function () {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [number]);
  return {
    number: data.currentNumber,
    isGoingUp: data.isGoingUp,
    isAnimating: data.isAnimating
  };
};

module.exports = useAnimateNumber;
//# sourceMappingURL=index.js.map
