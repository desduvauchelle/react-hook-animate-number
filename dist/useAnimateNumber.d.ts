declare type UseAnimateType = (props: {
    number: number;
    durationInMs?: number;
    decimalPlaces?: number;
}) => {
    number: number;
    isAnimating: boolean;
    isGoingUp: boolean;
};
declare const useAnimateNumber: UseAnimateType;
export default useAnimateNumber;
