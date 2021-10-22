import { useState, useEffect } from 'react'
import easing from './easingFunctions'
const FPS = 60



type FuncType = (props: {
	number: number,
	durationInMs?: number,
	decimalPlaces?: number
}) => number

const useAnimateNumber: FuncType =
	({
		number = 0,
		durationInMs = 4000,
		decimalPlaces = 0
	}) => {
		const [currentNumber, setCurrentNumber] = useState(0)
		const [originalNumber, setOriginalNumber] = useState(0)
		const [step, setStep] = useState(0)


		useEffect(() => {
			const endAnimationAndReset = () => {
				setOriginalNumber(number)
				setCurrentNumber(number)
				setStep(0)
			}
			if (number === originalNumber) return

			const numberOfSteps = Math.round(1000 / FPS * durationInMs / 1000)

			const progress = (step + 1) / numberOfSteps
			const percentageOfTargetValue = easing.easeOutExpo(progress)
			let currentValue = percentageOfTargetValue * number
			if (decimalPlaces === 0) {
				currentValue = Math.round(currentValue)
			}

			if (step === numberOfSteps) {
				endAnimationAndReset()
				return
			}

			setTimeout(() => {
				setStep(step + 1)
				setCurrentNumber(currentValue)
			}, 1000 / FPS)

		}, [number, originalNumber, currentNumber, step])

		return currentNumber
	}

export default useAnimateNumber