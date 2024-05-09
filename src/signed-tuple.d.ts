// stores number represented as tuple and isNegative flag
type SignedTuple<
  T extends Tuple = Tuple,
  N extends boolean = boolean,
> = T extends ZeroTuple
  ? { number: T; isNegative: false } // if T = 0, isNegative always false
  : {
      number: T;
      isNegative: N;
    };

// predefined numbers as SignedTuple
type ZeroSignedTuple = SignedTuple<ZeroTuple>;

// inverts boolean
type Invert<T extends boolean> = T extends true
  ? false
  : true;

// test if the number is negative
type IsNegative<T extends number> =
  `${T}` extends `-${string}` ? true : false;

// convert number to SignedTuple
type ToSignedTuple<T extends number> = SignedTuple<
  ToTuple<T>,
  IsNegative<T>
>;

// convert SignedTuple to string
type ToString<T> = T extends SignedTuple
  ? T['isNegative'] extends true
    ? `-${T['number']['length']}`
    : `${T['number']['length']}`
  : T;

// multiply the signs
type MultiplyIsNegative<
  A extends boolean,
  B extends boolean,
> = A extends B ? false : true;

// multiplication
type MultiplySignedTuple<
  A extends SignedTuple,
  B extends SignedTuple,
> = SignedTuple<
  MultiplyTuple<A['number'], B['number']>,
  MultiplyIsNegative<A['isNegative'], B['isNegative']>
>;

// division
type DivideSignedTuple<
  A extends SignedTuple,
  B extends SignedTuple,
> = DivideTuple<A['number'], B['number']> extends infer R // divide A by B and save the result to R
  ? R extends Tuple // if R is a Tuple we construct SignedTuple
    ? SignedTuple<
        R,
        MultiplyIsNegative<A['isNegative'], B['isNegative']>
      >
    : R // otherwise error occurred, so we propagate it
  : never;

// addition
type AddSignedTuple<
  A extends SignedTuple,
  B extends SignedTuple,
> = A['isNegative'] extends B['isNegative'] // if operands have the same sign
  ? SignedTuple<
      AddTuple<A['number'], B['number']>, // sum them up
      A['isNegative'] // and take the sign from first operand
    >
  : SubTuple<A['number'], B['number']> extends infer R1 // R1 = A - B
  ? R1 extends Tuple // if R1 >= 0
    ? SignedTuple<R1, A['isNegative']> // return R1 with A sign
    : SubTuple<B['number'], A['number']> extends infer R2 // if R1 < 0 then R2 = B - A
    ? R2 extends Tuple
      ? SignedTuple<R2, B['isNegative']> // return R2 with B sign
      : never
    : never
  : never;

// subtraction
type SubSignedTuple<
  A extends SignedTuple,
  B extends SignedTuple,
> = AddSignedTuple<
  A,
  SignedTuple<B['number'], Invert<B['isNegative']>>
>;
