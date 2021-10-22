# react-hook-animate-number

> Horizontal scroll component for javascript

[![NPM](https://img.shields.io/npm/v/react-horizontal-scroll-display.svg)](https://www.npmjs.com/package/react-horizontal-scroll-display) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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

import { useAnimateNumber } from 'react-horizontal-scroll-display'

const Example = () => {
 const animatedNumber = useAnimateNumber({ number: 1203 })
 return <>{animatedNumber}</>
}

```

### Attributes

| Attribute | Default | Type | Description |
| ----- | ----- | ----- | ----- |
| number | 0 | `number` | The number to display |
| durationInMs | 4000 | `number` | The duration of the animation |
| decimalPlaces | 0 | `number` | The number of decimal places |

## License

MIT © [desduvauchelle](https://github.com/desduvauchelle)
