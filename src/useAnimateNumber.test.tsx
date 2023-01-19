import react from 'react'
import useAnimateNumber from './useAnimateNumber'
import { act, renderHook } from '@testing-library/react-hooks'


it('should return the initial value', () => {
	const { result } = renderHook(() => useAnimateNumber({ number: 100 }))
	expect(result.current.number).toBe(0)
})

const sleep = (t: number) => new Promise(resolve => setTimeout(resolve, t))

it('should return the entered value at the end', async () => {
	// https://www.youtube.com/watch?v=PKUDcLGn-80
	// jest.useFakeTimers()
	// jest.spyOn(global, 'setTimeout')
	const duration = 1000
	const { result, waitFor } = renderHook(() => useAnimateNumber({ number: 100, durationInMs: duration }))
	expect(result.current.number).toBe(0)
	expect(result.current.isGoingUp).toBe(true)

	await waitFor(() => { return true }, { timeout: duration + 300 })
	expect(result.current.number).toBe(100)
})

it('should return the same value and not animate if setInitialValue = true', async () => {
	// https://www.youtube.com/watch?v=PKUDcLGn-80
	// jest.useFakeTimers()
	// jest.spyOn(global, 'setTimeout')
	const duration = 2000
	const number = 100
	const { result, waitFor } = renderHook(() => useAnimateNumber({ number: number, durationInMs: duration, setInitialValue: true }))
	expect(result.current.number).toBe(number)
	expect(result.current.isAnimating).toBe(false)

	await waitFor(() => { return true }, { timeout: duration + 200 })
	expect(result.current.number).toBe(number)
})
