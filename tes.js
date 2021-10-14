const { v4 } = require("uuid");

const arr = [
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 4 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 6 },
];
const objId = {};
const priceId = {};
// const newArr = [];
// for (let i = 0; i < arr.length; i++) {
//   const el = arr[i];
//   if (el.id !== objId[el.id]) {
//     el.price_code = priceId[el.id] = v4();
//     objId[el.id] = el.id;
//   }
//   newArr.push(el);
// }

const newArr = arr.map(el => {
  if (el.id !== objId[el.id]) {
    el.price_code = priceId[el.id] = v4();
    objId[el.id] = el.id;
  }
  return el;
}).map(el => {
  if (!el.price_code && el.id === objId[el.id]) {
    el.price_code = priceId[el.id];
  }
  return el;
});

console.log(newArr)