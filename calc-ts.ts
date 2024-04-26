type CalcError<T extends string> = {
  error: T;
};

export type OutOfRange = CalcError<'Out of range'>;
export type DivisionByZeroError = CalcError<'Division by zero'>;

// number represented as a tuple
type Num = void[];

// stores number represented as tuple and isNegative flag
type SignedNum<
  T extends Num | CalcError<E> = Num,
  S extends boolean | CalcError<E> = boolean,
  E extends string = string
> = T extends CalcError<E>
  ? CalcError<E>
  : S extends CalcError<E>
  ? CalcError<E>
  : {
      number: T;
      isNegative: S;
    };

// predefined numbers as tuples
type ZeroNum = [];
type OneNum = [void];

// predefined numbers as SignedNum
type ZeroSignedNum = SignedNum<ZeroNum>;

// convert number to Num and SignedNum
type ToNum<
  T extends number,
  R extends Num = ZeroNum
> = Abs<T> extends `${R['length']}` ? R : ToNum<T, [...R, void]>;

type Abs<T extends number> = `${T}` extends `${infer Sign}${infer Value}`
  ? Sign extends '-'
    ? Value
    : `${T}`
  : `${T}`;

type ToSignedNum<T extends number> = SignedNum<ToNum<T>, IsNegative<T>>;

type IsNegative<T extends number> = `${T}` extends `-${string}` ? true : false;

// SignedNum operations

// Negate<10> = -10
type Negate<A extends SignedNum> = A['isNegative'] extends true
  ? SignedNum<A['number'], false>
  : SignedNum<A['number'], true>;

// MaxAbsoluteNum< -10, -20 > = 20
type MaxAbsoluteNum<
  A extends SignedNum,
  B extends SignedNum,
  T extends void[] = []
> = T['length'] extends A['number']['length']
  ? B
  : T['length'] extends B['number']['length']
  ? A
  : MaxAbsoluteNum<A, B, [...T, void]>;

// MaxAbsoluteNum< -10, -20 > = 10
type MinAbsoluteNum<
  A extends SignedNum,
  B extends SignedNum,
  T extends void[] = []
> = T['length'] extends A['number']['length']
  ? A
  : T['length'] extends B['number']['length']
  ? B
  : MinAbsoluteNum<A, B, [...T, void]>;

// + and -
type AddNum<A extends Num, B extends Num> = [...A, ...B];
type SubNum<A extends Num, B extends Num> = A extends [...B, ...infer S]
  ? S
  : OutOfRange;

type AddSignedNum<
  A extends SignedNum,
  B extends SignedNum
> = A['isNegative'] extends true
  ? B['isNegative'] extends true
    ? // -A + (-b) => number: (A + b), sign: -
      SignedNum<AddNum<A['number'], B['number']>, true>
    : // -A + b => number: (A - b), sign: -
      SignedNum<SubNum<A['number'], B['number']>, true>
  : B['isNegative'] extends true
  ? // A + (-b) =>  number (A - b), sign: +
    SignedNum<SubNum<A['number'], B['number']>, false>
  : // A + b => number: A + b, sign: +
    SignedNum<AddNum<A['number'], B['number']>, false>;

type SubSignedNum<A extends SignedNum, B extends SignedNum> = AddSignedNum<
  MaxAbsoluteNum<A, Negate<B>>,
  MinAbsoluteNum<A, Negate<B>>
>;

// *
type MultiplyNum<A extends Num, B extends Num> = A extends ZeroNum
  ? ZeroNum
  : B extends ZeroNum
  ? ZeroNum
  : A extends OneNum
  ? B
  : B extends OneNum
  ? A
  : A extends [...OneNum, ...infer R]
  ? R extends Num
    ? AddNum<MultiplyNum<R, B>, A>
    : ZeroNum
  : ZeroNum;

type MultiplySign<
  A extends SignedNum,
  B extends SignedNum
> = A['isNegative'] extends true
  ? B['isNegative'] extends true
    ? false
    : true
  : B['isNegative'] extends true
  ? true
  : false;

type MultiplySignedNum<A extends SignedNum, B extends SignedNum> = SignedNum<
  MultiplyNum<A['number'], B['number']>,
  MultiplySign<A, B>
>;

// /
type DivideNum<
  A extends Num,
  B extends Num,
  R extends Num = ZeroNum
> = B extends ZeroNum
  ? DivisionByZeroError
  : B extends OneNum
  ? A
  : SubNum<A, B> extends infer C
  ? C extends Num
    ? DivideNum<C, B, AddNum<R, OneNum>>
    : R
  : ZeroNum;

type DivideSignedNum<A extends SignedNum, B extends SignedNum> = DivideNum<
  A['number'],
  B['number']
> extends CalcError<infer U>
  ? CalcError<U>
  : SignedNum<DivideNum<A['number'], B['number']>, MultiplySign<A, B>>;

export type Add<A extends number, B extends number> = AddSignedNum<
  // biggest number always goes as first argument, smallest as the second
  MaxAbsoluteNum<ToSignedNum<A>, ToSignedNum<B>>,
  MinAbsoluteNum<ToSignedNum<A>, ToSignedNum<B>>
>;

export type Sub<A extends number, B extends number> = SubSignedNum<
  ToSignedNum<A>,
  ToSignedNum<B>
>;

export type Multiply<A extends number, B extends number> = MultiplySignedNum<
  ToSignedNum<A>,
  ToSignedNum<B>
>;

export type Divide<A extends number, B extends number> = DivideSignedNum<
  ToSignedNum<A>,
  ToSignedNum<B>
>;

export type ToNumber<T> = T extends CalcError<string>
  ? CalcError<string>
  : T extends ZeroSignedNum
  ? '0'
  : T extends SignedNum
  ? T['isNegative'] extends true
    ? `-${T['number']['length']}`
    : `${T['number']['length']}`
  : never;
