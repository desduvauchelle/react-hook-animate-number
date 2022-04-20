import { EasingFunctionNames } from './easingFunctions';
export declare type UseAnimateNumberProps = {
    number: number;
    durationInMs?: number;
    decimalPlaces?: number;
    easingFunctionName?: EasingFunctionNames;
};
export declare type UseAnimateType = (props: UseAnimateNumberProps) => {
    number: number;
    isAnimating: boolean;
    isGoingUp: boolean;
};
declare const useAnimateNumber: UseAnimateType;
export default useAnimateNumber;
