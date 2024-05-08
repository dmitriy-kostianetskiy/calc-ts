type AbsTests = {
  '1': AreEqual<'1', Abs<1>>;
  '-1': AreEqual<'1', Abs<-1>>;
  '0': AreEqual<'0', Abs<0>>;
  '-0': AreEqual<'0', Abs<-0>>;
};

type ToTupleTests = {
  '0 converts to []': AreEqual<[], ToTuple<0>>;
  '1 converts to [void]': AreEqual<[void], ToTuple<1>>;
  '3 converts to [void, void, void]': AreEqual<
    [void, void, void],
    ToTuple<3>
  >;
  // negative numbers
  '-1 converts to [void]': AreEqual<[void], ToTuple<-1>>;
};

type AdditionTests = {
  '2 + 3 = 5': AreEqual<
    ToTuple<5>,
    AddTuple<ToTuple<2>, ToTuple<3>>
  >;
  '2 + 0 = 2': AreEqual<
    ToTuple<2>,
    AddTuple<ToTuple<2>, ToTuple<0>>
  >;
  '0 + 0 = 0': AreEqual<
    ToTuple<0>,
    AddTuple<ToTuple<0>, ToTuple<0>>
  >;
};

type SubtractionTests = {
  '3 - 2 = 1': AreEqual<
    ToTuple<1>,
    SubTuple<ToTuple<3>, ToTuple<2>>
  >;
  '2 - 2 = 0': AreEqual<
    ToTuple<0>,
    SubTuple<ToTuple<2>, ToTuple<2>>
  >;
  '2 - 3 = OutOfRangeError': AreEqual<
    OutOfRangeError,
    SubTuple<ToTuple<2>, ToTuple<3>>
  >;
};

type IncrementTests = {
  'inc(0) = 1': AreEqual<
    ToTuple<1>,
    IncrementTuple<ToTuple<0>>
  >;
  'inc(1) = 2': AreEqual<
    ToTuple<2>,
    IncrementTuple<ToTuple<1>>
  >;
};

type DecrementTests = {
  'dec(1) = 0': AreEqual<
    ToTuple<0>,
    DecrementTuple<ToTuple<1>>
  >;
  'dec(2) = 1': AreEqual<
    ToTuple<1>,
    DecrementTuple<ToTuple<2>>
  >;
  'dec(0) = OutOfRangeError': AreEqual<
    OutOfRangeError,
    DecrementTuple<ToTuple<0>>
  >;
};

type MultiplicationTests = {
  '0 * 1 = 0': AreEqual<
    ToTuple<0>,
    MultiplyTuple<ToTuple<0>, ToTuple<1>>
  >;
  '1 * 0 = 0': AreEqual<
    ToTuple<0>,
    MultiplyTuple<ToTuple<1>, ToTuple<0>>
  >;
  '1 * 2 = 2': AreEqual<
    ToTuple<2>,
    MultiplyTuple<ToTuple<1>, ToTuple<2>>
  >;
  '2 * 1 = 2': AreEqual<
    ToTuple<2>,
    MultiplyTuple<ToTuple<2>, ToTuple<1>>
  >;
  '2 * 3 = 6': AreEqual<
    ToTuple<6>,
    MultiplyTuple<ToTuple<2>, ToTuple<3>>
  >;
};

type DivisionTests = {
  '0 / 1 = 0': AreEqual<
    ToTuple<0>,
    DivideTuple<ToTuple<0>, ToTuple<1>>
  >;
  '1 / 0 = DivisionByZeroError': AreEqual<
    DivisionByZeroError,
    DivideTuple<ToTuple<1>, ToTuple<0>>
  >;
  '1 / 2 = 0': AreEqual<
    ToTuple<0>,
    DivideTuple<ToTuple<1>, ToTuple<2>>
  >;
  '2 / 2 = 1': AreEqual<
    ToTuple<1>,
    DivideTuple<ToTuple<2>, ToTuple<2>>
  >;
  '5 / 2 = 2': AreEqual<
    ToTuple<2>,
    DivideTuple<ToTuple<5>, ToTuple<2>>
  >;
};
