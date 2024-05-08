function toTuple(t: number, r: null[] = []): null[] {
  if (t === r.length) {
    return r;
  }

  return toTuple(t, [...r, null]);
}

// [null, null, null, null, null]
toTuple(5);
