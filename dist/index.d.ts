declare const _default: {
    useAnimateNumber: (props: {
        number: number;
        durationInMs?: number | undefined;
        decimalPlaces?: number | undefined;
    }) => {
        number: number;
        isAnimating: boolean;
        isGoingUp: boolean;
    };
    easing: {
        easeInOutCubic: (x: number) => number;
        easeOutCirc: (x: number) => number;
        easeOutQuint: (x: number) => number;
        easeOutExpo: (x: number) => number;
    };
};
export default _default;
