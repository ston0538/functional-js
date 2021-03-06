export const L = {};
export const curry = (f) => (a, ..._) =>
  _.length ? f(a, ..._) : (..._) => f(a, ..._);

export const map = (f, iter) => {
  let res = [];
  for (const p of iter) {
    res.push(f(p));
  }
  return res;
};
export const curryMap = curry((f, iter) => {
  let res = [];
  for (const p of iter) {
    res.push(f(p));
  }
  return res;
});
export const filter = (f, iter) => {
  let result = [];
  for (const i of iter) {
    if (f(i)) result.push(i);
  }
  return result;
};
export const curryFilter = curry((f, iter) => {
  let result = [];
  for (const i of iter) {
    if (f(i)) result.push(i);
  }
  return result;
});
export const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};
export const curryReduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});
export const go = (...args) => reduce((a, f) => f(a), args);

// export const pipe = (f, ...functions) => {
//   return function (...a) {
//     return go(f(...a), ...functions);
//   };
// };
export const pipe = (f, ...functions) => (...a) => go(f(...a), ...functions);

export const range = (l) => {
  const result = [];
  let i = -1;
  while (++i < l) {
    result.push(i);
  }
  return result;
};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

export const take = (l, iter) => {
  const result = [];
  for (const a of iter) {
    result.push(a);
    if (result.length == l) return result;
  }
};
export const test = (name, time, f) => {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
};
