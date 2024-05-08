type ToSignedTupleTests = {
  '0': AreEqual<
    { number: []; isNegative: false },
    ToSignedTuple<0>
  >;
  '1': AreEqual<
    { number: [void]; isNegative: false },
    ToSignedTuple<1>
  >;
  '-3': AreEqual<
    { number: [void, void, void]; isNegative: true },
    ToSignedTuple<-3>
  >;
};

type MultiplySignedTupleTests = {
  '2 * 0 = 0': AreEqual<
    ToSignedTuple<0>,
    MultiplySignedTuple<ToSignedTuple<2>, ToSignedTuple<0>>
  >;
  '2 * 1 = 2': AreEqual<
    ToSignedTuple<2>,
    MultiplySignedTuple<ToSignedTuple<2>, ToSignedTuple<1>>
  >;
  '2 * 2 = 4': AreEqual<
    ToSignedTuple<4>,
    MultiplySignedTuple<ToSignedTuple<2>, ToSignedTuple<2>>
  >;
  '-2 * 0': AreEqual<
    ToSignedTuple<0>,
    MultiplySignedTuple<ToSignedTuple<-2>, ToSignedTuple<0>>
  >;
  '-2 * 1 = -2': AreEqual<
    ToSignedTuple<-2>,
    MultiplySignedTuple<ToSignedTuple<-2>, ToSignedTuple<1>>
  >;
  '-2 * 2 = -4': AreEqual<
    ToSignedTuple<-4>,
    MultiplySignedTuple<ToSignedTuple<-2>, ToSignedTuple<2>>
  >;
  '-2 * (-2)': AreEqual<
    ToSignedTuple<4>,
    MultiplySignedTuple<
      ToSignedTuple<-2>,
      ToSignedTuple<-2>
    >
  >;
};

type DivideSignedTupleTests = {
  '1 / 0 = DivisionByZeroError': AreEqual<
    DivisionByZeroError,
    DivideSignedTuple<ToSignedTuple<2>, ToSignedTuple<0>>
  >;
  '5 / 1 = 5': AreEqual<
    ToSignedTuple<5>,
    DivideSignedTuple<ToSignedTuple<5>, ToSignedTuple<1>>
  >;
  '3 / 2 = 1': AreEqual<
    ToSignedTuple<1>,
    DivideSignedTuple<ToSignedTuple<3>, ToSignedTuple<2>>
  >;
  '2 / 3 = 0': AreEqual<
    ToSignedTuple<0>,
    DivideSignedTuple<ToSignedTuple<2>, ToSignedTuple<3>>
  >;
  '-5 / 1 = -5': AreEqual<
    ToSignedTuple<-5>,
    DivideSignedTuple<ToSignedTuple<-5>, ToSignedTuple<1>>
  >;
  '-3 / 2 = -1': AreEqual<
    ToSignedTuple<-1>,
    DivideSignedTuple<ToSignedTuple<-3>, ToSignedTuple<2>>
  >;
  '-2 / 3 = 0': AreEqual<
    ToSignedTuple<0>,
    DivideSignedTuple<ToSignedTuple<-2>, ToSignedTuple<3>>
  >;
  '5 / -1 = -5': AreEqual<
    ToSignedTuple<-5>,
    DivideSignedTuple<ToSignedTuple<5>, ToSignedTuple<-1>>
  >;
  '3 / -2 = -1': AreEqual<
    ToSignedTuple<-1>,
    DivideSignedTuple<ToSignedTuple<3>, ToSignedTuple<-2>>
  >;
  '2 / -3 = 0': AreEqual<
    ToSignedTuple<0>,
    DivideSignedTuple<ToSignedTuple<2>, ToSignedTuple<-3>>
  >;
  '-5 / -1 = 5': AreEqual<
    ToSignedTuple<5>,
    DivideSignedTuple<ToSignedTuple<-5>, ToSignedTuple<-1>>
  >;
  '-3 / -2 = 1': AreEqual<
    ToSignedTuple<1>,
    DivideSignedTuple<ToSignedTuple<-3>, ToSignedTuple<-2>>
  >;
  '-2 / -3 = 0': AreEqual<
    ToSignedTuple<0>,
    DivideSignedTuple<ToSignedTuple<-2>, ToSignedTuple<-3>>
  >;
};

type AddSignedTupleTests = {
  '5 + 0 = 5': AreEqual<
    ToSignedTuple<5>,
    AddSignedTuple<ToSignedTuple<5>, ToSignedTuple<0>>
  >;
  '5 + 5 = 10': AreEqual<
    ToSignedTuple<10>,
    AddSignedTuple<ToSignedTuple<5>, ToSignedTuple<5>>
  >;
  '5 + (-1) = 4': AreEqual<
    ToSignedTuple<4>,
    AddSignedTuple<ToSignedTuple<5>, ToSignedTuple<-1>>
  >;
  '-5 + 1 = -4': AreEqual<
    ToSignedTuple<-4>,
    AddSignedTuple<ToSignedTuple<-5>, ToSignedTuple<1>>
  >;
  '-5 + (-1) = -6': AreEqual<
    ToSignedTuple<-6>,
    AddSignedTuple<ToSignedTuple<-5>, ToSignedTuple<-1>>
  >;
};

type SubSignedTupleTests = {
  '5 - 0 = 5': AreEqual<
    ToSignedTuple<5>,
    SubSignedTuple<ToSignedTuple<5>, ToSignedTuple<0>>
  >;
  '5 - 1 = 4': AreEqual<
    ToSignedTuple<4>,
    SubSignedTuple<ToSignedTuple<5>, ToSignedTuple<1>>
  >;
  '5 - 10 = -5': AreEqual<
    ToSignedTuple<-5>,
    SubSignedTuple<ToSignedTuple<5>, ToSignedTuple<10>>
  >;
  '-5 - 10 = -15': AreEqual<
    ToSignedTuple<-15>,
    SubSignedTuple<ToSignedTuple<-5>, ToSignedTuple<10>>
  >;
  '-5 - (-10) = 5': AreEqual<
    ToSignedTuple<5>,
    SubSignedTuple<ToSignedTuple<-5>, ToSignedTuple<-10>>
  >;
};
