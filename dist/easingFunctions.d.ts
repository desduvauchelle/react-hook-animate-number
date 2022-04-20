export declare type EasingFunction = (x: number) => number;
export declare type EasingFunctionNames = "easeInOutCubic" | "easeOutCirc" | "easeOutQuint" | "easeOutExpo";
declare const easing: {
    [easingName: string]: EasingFunction;
};
export default easing;
