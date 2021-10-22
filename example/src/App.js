import React from 'react'

import animateNumber from 'react-hook-animate-number'
const App = () => {
	const [number, setNumber] = React.useState(382)
	const [duration, setDuration] = React.useState(4000)
	const [tempNumber, setTempNumber] = React.useState(382)
	const [tempDuration, setTempDuration] = React.useState(4000)
	const animatedNumber = animateNumber.useAnimateNumber({ number: number, durationInMs: duration })

	const onSubmit = (e) => {
		e.preventDefault()
		setNumber(tempNumber)
		setDuration(tempDuration)
	}

	const randomNumber = () => {
		const random = Math.floor(Math.random() * 1000) + 1
		setTempNumber(random)
		setNumber(random)
	}

	return <>
		<h1>Animated number</h1>
		<form onSubmit={onSubmit}>
			<p>You can change the number it needs to go:</p>
			<div style={{ margin: `0 auto`, maxWidth: 380, width: `auto` }}>
				<p><strong>Number:</strong></p>
				<input type="number" value={tempNumber} onChange={e => setTempNumber(e.target.value)} />
				<br />
				<br />
				<p><strong>Animation duration (ms):</strong></p>
				<input type="number" value={tempDuration} onChange={e => setTempDuration(e.target.value)} />
				<br />
				<br />
				<p></p>
				<button type="submit">Refresh</button>
				<button type="submit" onClick={randomNumber}>Generate randomNumber</button>


			</div>
		</form>
		<h3>{animatedNumber}</h3>
	</>
}

export default App
