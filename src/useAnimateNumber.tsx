import { useState, useEffect } from 'react'
import easing, { EasingFunctionNames } from './easingFunctions'
const FPS = 60


export type UseAnimateNumberProps = {
	number: number,
	durationInMs?: number,
	decimalPlaces?: number,
	easingFunctionName?: EasingFunctionNames
}

export type UseAnimateType = (props: UseAnimateNumberProps) => { number: number, isAnimating: boolean, isGoingUp: boolean }

const useAnimateNumber: UseAnimateType =
	({
		number = 0,
		durationInMs = 4000,
		decimalPlaces = 0,
		easingFunctionName = "easeOutExpo"
	}) => {
		const [currentNumber, setCurrentNumber] = useState(0)
		const [originalNumber, setOriginalNumber] = useState(0)
		const [currentTarget, setCurrentTarget] = useState(0)
		const [step, setStep] = useState(0)


		useEffect(() => {
			if (number === originalNumber) return
			let mounted = true

			// Check if it's already in the middle of an animation
			if (step > 0 && currentTarget !== number) {
				setOriginalNumber(currentNumber)
				setStep(0)
			}

			let isGoingUp = number > originalNumber

			const numberOfSteps = Math.round(1000 / FPS * durationInMs / 1000)

			const progress = (step + 1) / numberOfSteps
			let easingFunction = easing.easeOutExpo
			if (easingFunctionName && easing[easingFunctionName]) {
				easingFunction = easing[easingFunctionName]
			}
			const percentageOfTargetValue = easingFunction(progress)
			let currentValue = percentageOfTargetValue * number
			if (!isGoingUp) {
				currentValue = (1 - percentageOfTargetValue) * originalNumber + number
			}
			if(currentValue !== 0){
				currentValue = parseFloat(currentValue.toFixed(decimalPlaces))
			}
			if (isGoingUp && currentValue > number) {
				currentValue = number
			}
			if (!isGoingUp && currentValue < number) {
				currentValue = number
			}
			// console.log(`From ${originalNumber} to ${currentTarget}. Currently: ${currentValue} ${isGoingUp? `UP⬆️`: `DOWN⬇️`}`)

			if (step === numberOfSteps || currentValue === number) {
				setOriginalNumber(number)
				setCurrentNumber(number)
				setStep(0)
				return
			}

			setTimeout(() => {
				if(mounted){
					setCurrentTarget(number)
					setStep(step + 1)
					setCurrentNumber(currentValue)
				}
			}, 1000 / FPS)

			return () => {
				mounted = false
			}
		}, [number, originalNumber, currentNumber, step])

		return {
			number: currentNumber,
			isGoingUp: number > originalNumber,
			isAnimating: number !== originalNumber
		}
	}

export default useAnimateNumber