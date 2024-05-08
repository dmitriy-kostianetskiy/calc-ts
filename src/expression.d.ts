type Expression = {
  '-2 + 5 * 2 - 10/2 = 7': AreEqual<
    '3',
    ToString<
      SubSignedTuple<
        AddSignedTuple<
          ToSignedTuple<-2>,
          MultiplySignedTuple<
            ToSignedTuple<5>,
            ToSignedTuple<2>
          >
        >,
        DivideSignedTuple<
          ToSignedTuple<10>,
          ToSignedTuple<2>
        >
      >
    >
  >;
};
