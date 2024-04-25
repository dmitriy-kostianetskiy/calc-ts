import {
  ToNumber,
  Add,
  Sub,
  Divide,
  Multiply,
  DivisionByZeroError,
} from './calc-ts';

// tests
type Assert<E, A extends E> = A extends E ? true : false;

export type Tests = {
  // Add
  '5 + 0': Assert<'5', ToNumber<Add<5, 0>>>;
  '5 + 5': Assert<'10', ToNumber<Add<5, 5>>>;
  '5 + (-1)': Assert<'4', ToNumber<Add<5, -1>>>;
  '-5 + 1': Assert<'-4', ToNumber<Add<-5, 1>>>;
  '-5 + (-1)': Assert<'-6', ToNumber<Add<-5, -1>>>;
  // Subtract
  '5 - 0': Assert<'5', ToNumber<Sub<5, 0>>>;
  '5 - 1': Assert<'4', ToNumber<Sub<5, 1>>>;
  '5 - 10': Assert<'-5', ToNumber<Sub<5, 10>>>;
  '-5 - 10': Assert<'-15', ToNumber<Sub<-5, 10>>>;
  '5 - (-10)': Assert<'15', ToNumber<Sub<5, -10>>>;
  '-5 - (-10)': Assert<'5', ToNumber<Sub<-5, -10>>>;
  // Multiply
  '2 * 0': Assert<'0', ToNumber<Multiply<2, 0>>>;
  '2 * 1': Assert<'2', ToNumber<Multiply<2, 1>>>;
  '2 * 2': Assert<'4', ToNumber<Multiply<2, 2>>>;
  '-2 * 0': Assert<'0', ToNumber<Multiply<-2, 0>>>;
  '-2 * 1': Assert<'-2', ToNumber<Multiply<-2, 1>>>;
  '-2 * 2': Assert<'-4', ToNumber<Multiply<-2, 2>>>;
  '-2 * (-2)': Assert<'4', ToNumber<Multiply<2, 2>>>;
  // Divide
  '1 / 0': Assert<DivisionByZeroError, Divide<1, 0>>;
  '5 / 1': Assert<'5', ToNumber<Divide<5, 1>>>;
  '3 / 2': Assert<'1', ToNumber<Divide<3, 2>>>;
  '2 / 3': Assert<'0', ToNumber<Divide<2, 3>>>;
  '-5 / 1': Assert<'-5', ToNumber<Divide<-5, 1>>>;
  '-3 / 2': Assert<'-1', ToNumber<Divide<-3, 2>>>;
  '-2 / 3': Assert<'0', ToNumber<Divide<-2, 3>>>;
  '5 / -1': Assert<'-5', ToNumber<Divide<5, -1>>>;
  '3 / -2': Assert<'-1', ToNumber<Divide<3, -2>>>;
  '2 / -3': Assert<'0', ToNumber<Divide<2, -3>>>;
  '-5 / -1': Assert<'5', ToNumber<Divide<-5, -1>>>;
  '-3 / -2': Assert<'1', ToNumber<Divide<-3, -2>>>;
  '-2 / -3': Assert<'0', ToNumber<Divide<-2, -3>>>;
};
