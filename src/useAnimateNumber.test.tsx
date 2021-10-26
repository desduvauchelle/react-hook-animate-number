import react from 'react'
import useAnimateNumber from './useAnimateNumber'
import { act, renderHook } from '@testing-library/react-hooks'


it('should return the initial value', () => {
	const { result } = renderHook(() => useAnimateNumber({ number: 100 }))
	expect(result.current).toBe(0)
})

const sleep = (t:number) => new Promise(resolve => setTimeout(resolve, t))

it('should return the entered value at time x',  async () => {
	// jest.useFakeTimers()
	// jest.spyOn(global, 'setTimeout')
	const duration = 2000
	const { result, waitForValueToChange } = renderHook(() => useAnimateNumber({ number: 100, durationInMs: duration }))
	expect(result.current).toBe(0)

	// await waitForValueToChange(() => {
	// 	return result.current
	// }, { timeout: duration + 100 })
	act(() => {
		//
		 jest.advanceTimersByTime(duration)
	})

	await sleep(duration + 100)
	expect(result.current).toBe(100)
})