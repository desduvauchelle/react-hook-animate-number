// https://easings.net/#

// x is a value for progress of the animation between 0 and 1

export type EasingFunction = (x: number) => number
export type EasingFunctionNames = "easeInOutCubic" | "easeOutCirc" | "easeOutQuint" | "easeOutExpo"

const easing: {
	[easingName: string]: EasingFunction
} = {
	easeInOutCubic: (x: number): number => {
		if (x >= 1) return 1
		return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
	},
	easeOutCirc: (x: number): number => {
		if (x >= 1) return 1
		return Math.sqrt(1 - Math.pow(x - 1, 2))
	},
	easeOutQuint: (x: number): number => {
		if (x >= 1) return 1
		return 1 - Math.pow(1 - x, 5)
	},
	easeOutExpo: (x: number): number => {
		return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
	}
}

export default easing