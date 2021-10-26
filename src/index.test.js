import component from '.'

describe('Component', () => {
	it('Should have easing functions', () => {
		expect(component.easing).toBeDefined()
	})
	it('Should have easing functions', () => {
		expect(component.useAnimateNumber).toBeDefined()
	})
})
