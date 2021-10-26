import react from 'react'
import useAnimateNumber from './useAnimateNumber'
import { act, renderHook } from '@testing-library/react-hooks'


it('should return the initial value', () => {
	const { result } = renderHook(() => useAnimateNumber({ number: 100 }))
	expect(result.current.number).toBe(0)
})

const sleep = (t:number) => new Promise(resolve => setTimeout(resolve, t))

it('should return the entered value at the end', async () => {
	// https://www.youtube.com/watch?v=PKUDcLGn-80
	// jest.useFakeTimers()
	// jest.spyOn(global, 'setTimeout')
	const duration = 2000
	const { result, waitFor } = renderHook(() => useAnimateNumber({ number: 100, durationInMs: duration }))
	expect(result.current.number).toBe(0)
	expect(result.current.isGoingUp).toBe(true)

	await waitFor(() => { return result.current.number === 100}, { timeout: duration + 200 })
	expect(result.current.number).toBe(100)
})