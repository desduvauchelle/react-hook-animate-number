import React from 'react'

import useAnimateNumber from 'react-hook-animate-number'

const App = () => {
	const [number, setNumber] = React.useState(382)
	const [duration, setDuration] = React.useState(4000)
	const [tempNumber, setTempNumber] = React.useState(382)
	const [tempDuration, setTempDuration] = React.useState(4000)
	const animatedNumber = useAnimateNumber({
		number: number,
		durationInMs: duration,
		debug: true,
	})

	const onSubmit = (e) => {
		e.preventDefault()
		setNumber(tempNumber)
		setDuration(tempDuration)
	}

	const randomNumber = (e: FormEvent) => {
		e.preventDefault()
		const random = Math.floor(Math.random() * 1000) + 1
		setTempNumber(random)
		setNumber(random)
		setDuration(tempDuration)
	}


	return <div className="min-h-screen flex flex-col justify-center items-center">
		<h1 className="text-6xl font-extrabold mb-12">Animated number</h1>
		<div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-center gap-12">

			<div className="flex-1 flex flex-col gap-4">
				<div className={`text-6xl font-extrabold ${!animatedNumber.isAnimating ? "bg-slate-300 dark:bg-slate-700" : animatedNumber.isGoingUp ? "bg-red-500" : "bg-green-500"} rounded-xl text-center py-4 w-full`}>
					{animatedNumber.number}
				</div>
				<p className='flex flex-row gap-2 flex-wrap'>
					<span className="bg-slate-50 dark:bg-slate-700 rounded-lg px-2">To: {number}</span>
					<span className="bg-slate-50 dark:bg-slate-700 rounded-lg px-2">Duration: {duration}</span>
					<span className="bg-slate-50 dark:bg-slate-700 rounded-lg px-2">Is animating: {animatedNumber.isAnimating ? "true" : "false"}</span>
					<span className="bg-slate-50 dark:bg-slate-700 rounded-lg px-2">Is going up: {animatedNumber.isGoingUp ? "true" : "false"}</span>
				</p>
				<button onClick={randomNumber} className="bg-blue-500 text-2xl px-8 py-2 rounded-lg mt-8">Random number</button>
			</div>


			<form onSubmit={onSubmit} className="flex-1">
				<div className="flex flex-col gap-4">

					<div>
						<strong>Number:</strong>
						<input
							type="number"
							className="block rounded-lg w-full p-2 text-slate-800"
							placeholder='Enter a number...'
							value={tempNumber}
							onChange={e => setTempNumber(e.target.value)} />
					</div>




					<div>
						<strong>Animation duration (ms):</strong>
						<input type="number"
							className="block rounded-lg w-full p-2 text-slate-800"
							placeholder='Enter a number...'
							value={tempDuration}
							onChange={e => setTempDuration(e.target.value)} />
					</div>



					<button className="bg-blue-500 text-2xl px-8 py-2 rounded-lg w-full" type="submit">Launch</button>
				</div>
			</form>


		</div>
	</div>
}

export default App
