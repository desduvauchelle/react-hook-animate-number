import { useState, useEffect, useRef, useCallback } from 'react'
import easing, { EasingFunctionNames } from './easingFunctions'
import { applyThousandSeparator } from './helpers'
const FPS = 60


export type UseAnimateNumberProps = {
	number: number,
	durationInMs?: number,
	decimalPlaces?: number,
	thousandSeparator?: ',' | null,
	easingFunctionName?: EasingFunctionNames,
	setInitialValue?: boolean,
	debug?: boolean
}

export type UseAnimateType = (props: UseAnimateNumberProps) => { number: number, isAnimating: boolean, isGoingUp: boolean }

const useAnimateNumber: UseAnimateType =
	({
		number = 0,
		durationInMs = 4000,
		decimalPlaces = 0,
		thousandSeparator = ',',
		easingFunctionName = "easeOutExpo",
		setInitialValue = false,
		debug = false
	}) => {
		const [currentNumber, setCurrentNumber] = useState(0)
		const [originalNumber, setOriginalNumber] = useState(setInitialValue ? number : 0)
		const [currentTarget, setCurrentTarget] = useState(0)
		const [step, setStep] = useState(0)
		const [data, setData] = useState({
			currentNumber: 0,
			originalNumber: setInitialValue ? number : 0,
			step: 0,
			isGoingUp: false,
			isAnimating: false
		})
		const requestRef = useRef<number>()
		const mountedRef = useRef<boolean>(true)
		const previousTimeRef = useRef<undefined | number>()


		const animate = useCallback((time: number) => {
			if (!mountedRef.current) return
			if (previousTimeRef.current === undefined) {
				previousTimeRef.current = time
				requestRef.current = requestAnimationFrame(animate)
				return
			}

			const reset = () => {
				setData({
					currentNumber: number,
					originalNumber: number,
					step: 0,
					isGoingUp: false,
					isAnimating: false
				})
				previousTimeRef.current = undefined
				if (requestRef.current) cancelAnimationFrame(requestRef.current)
				requestRef.current = undefined
			}

			if (typeof number !== "number") {
				try {
					number = parseFloat(number)
				} catch (e) {
					console.error("useAnimateNumber: number is not a number")
					reset()
					return
				}
			}

			if (number === data.currentNumber) {
				reset()
				return
			}

			const deltaTime = time - previousTimeRef.current

			// Animation is finished
			if (deltaTime >= durationInMs) {
				reset()
				return
			}

			//
			// Animation - Update the data using easing function
			//
			let easingFunction = easing.easeOutExpo
			if (easingFunctionName && easing[easingFunctionName]) {
				easingFunction = easing[easingFunctionName]
			}

			const progress = deltaTime / durationInMs
			const percentageOfTargetValue = easingFunction(progress)
			let currentValue = percentageOfTargetValue * number
			setData(previousData => {
				const isGoingUp = number > previousData.originalNumber
				if (!isGoingUp) {
					currentValue = (1 - percentageOfTargetValue) * previousData.originalNumber + number
				}
				if (currentValue !== 0) {
					currentValue = parseFloat(currentValue.toFixed(decimalPlaces))
				}
				if (thousandSeparator !== null) {
					currentValue = parseFloat(applyThousandSeparator(currentValue.toString(), thousandSeparator))
				}
				if (isGoingUp && currentValue > number) {
					currentValue = number
				}
				if (!isGoingUp && currentValue < number) {
					currentValue = number
				}
				return {
					...previousData,
					currentNumber: currentValue,
					isGoingUp,
					isAnimating: true
				}
			})
			requestRef.current = window.requestAnimationFrame(animate)
		}, [number, durationInMs, decimalPlaces, easingFunctionName])


		useEffect(() => {
			requestRef.current = window.requestAnimationFrame(animate)
			return () => {
				if (requestRef.current) cancelAnimationFrame(requestRef.current)
			}
		}, [number])



		return {
			number: data.currentNumber,
			isGoingUp: data.isGoingUp,
			isAnimating: data.isAnimating
		}
	}

export default useAnimateNumber
