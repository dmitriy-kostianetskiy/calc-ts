// number represented as a tuple
type Tuple = void[];

// predefined numbers as tuples
type ZeroTuple = [];
type OneTuple = [void];

// get absolute value of number (as a side effect converts number into a string)
type Abs<T extends number> =
  `${T}` extends `${infer Sign}${infer Value}`
    ? Sign extends '-'
      ? Value
      : `${T}`
    : `${T}`;

// convert from number to tuple
type ToTuple<
  T extends number, // input number
  R extends Tuple = ZeroTuple, // result
> = Abs<T> extends `${R['length']}` // check if absolute value of T equals length of the result
  ? R // return result
  : ToTuple<T, [...R, void]>; // add one more element to the result and call ToTuple recursively

// addition
type AddTuple<A extends Tuple, B extends Tuple> = [
  ...A,
  ...B,
];

// subtraction
type SubTuple<
  A extends Tuple,
  B extends Tuple,
> = A extends [...B, ...infer R] ? R : OutOfRangeError;

// increment
type IncrementTuple<A extends Tuple> = AddTuple<
  A,
  OneTuple
>;

// decrement
type DecrementTuple<A extends Tuple> = SubTuple<
  A,
  OneTuple
>;

// multiplication
type MultiplyTuple<
  A extends Tuple,
  B extends Tuple,
> = B extends ZeroTuple // if B = 0, return 0
  ? ZeroTuple
  : DecrementTuple<A> extends infer S // literally S = A - 1
  ? S extends Tuple
    ? AddTuple<MultiplyTuple<S, B>, B> // if S >= 0, return B + (A - 1) * B
    : ZeroTuple // if S < 0, return 0
  : ZeroTuple;

// division
type DivideTuple<
  A extends Tuple,
  B extends Tuple,
  R extends Tuple = ZeroTuple, // R is accumulating the result
> = B extends ZeroTuple
  ? DivisionByZeroError //  if B = 0, return DivisionByZeroError
  : B extends OneTuple // if B = 1, return A
  ? A
  : SubTuple<A, B> extends infer S // literally S = A - B
  ? S extends Tuple
    ? DivideTuple<S, B, IncrementTuple<R>> // if S >= 0, recursively divide S by B and increment R
    : R // if S < 0, return R
  : ZeroTuple;
