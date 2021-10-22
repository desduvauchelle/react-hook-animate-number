declare type FuncType = (props: {
    number: number;
    durationInMs?: number;
    decimalPlaces?: number;
}) => number;
declare const useAnimateNumber: FuncType;
export default useAnimateNumber;
