type CalcError<T extends string> = {
  error: T;
};

type OutOfRangeError = CalcError<'Out of range'>;
type DivisionByZeroError = CalcError<'Division by zero'>;
