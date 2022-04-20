# react-hook-animate-number

> Horizontal scroll component for javascript

[![NPM](https://img.shields.io/npm/v/react-hook-animate-number.svg)](https://www.npmjs.com/package/react-hook-animate-number) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A simple number animation using React hooks.

Try out the [DEMO HERE](https://desduvauchelle.github.io/react-hook-animate-number/)

## Install

```bash
npm install --save react-hook-animate-number
```

## Usage

```jsx
//
// \FUNCTIONAL COMPONENT
//
import React from 'react'

import useAnimateNumber from 'react-hook-animate-number'

const Example = () => {
 const animatedNumber = useAnimateNumber({ number: 1203 })
 return <>{animatedNumber.number}</>
}

```

### Returns

```json
{
  number: 3, // Number
  isAnimating: true, // Boolean
  isGoingUp: true // boolean
}
```

- **number** `number` Returns the current number
- **isAnimating** `boolean` Is the number currently being animated
- **isGoingUp** `boolean` Is the number currently going up or down

### Attributes

| Attribute | Default | Type | Description |
| ----- | ----- | ----- | ----- |
| number | 0 | `number` | The number to display |
| durationInMs | 4000 | `number` | The duration of the animation |
| decimalPlaces | 0 | `number` | The number of decimal places |
| easingFunctionName | "easeOutExpo" | `string` | The animation easing function name, options are: `"easeInOutCubic" | "easeOutCirc" | "easeOutQuint" | "easeOutExpo"` |

## Todo

- Add more tests

## License

MIT © [desduvauchelle](https://github.com/desduvauchelle)
