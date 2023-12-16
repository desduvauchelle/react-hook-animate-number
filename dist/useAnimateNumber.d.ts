import { EasingFunctionNames } from './easingFunctions';
export declare type UseAnimateNumberProps = {
    number: number;
    durationInMs?: number;
    decimalPlaces?: number;
    thousandSeparator?: ',' | null;
    easingFunctionName?: EasingFunctionNames;
    setInitialValue?: boolean;
    debug?: boolean;
};
export declare type UseAnimateType = (props: UseAnimateNumberProps) => {
    number: number;
    isAnimating: boolean;
    isGoingUp: boolean;
};
declare const useAnimateNumber: UseAnimateType;
export default useAnimateNumber;
