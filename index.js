const { QueryTypes } = require('sequelize');
const { config, sequelize } = require("./config");
const fs = require("fs");
const { v4 } = require('uuid');
const jsonSql = require("json-sql")({
  separatedValues: false,
  namedValues: false,
  dialect: 'postgresql'
});

const INPUT_FILE = config.csv_file;
const TABLE_NAME = config.table_name;

console.log("Processing data...");
const iFile = fs.readFileSync(INPUT_FILE, "utf-8");
const lines = iFile.split("\n");
let COLUMNS = lines.shift().split(";").map(el => el.trim());
let arr = [];
lines.forEach((line) => {
  let obj = {};
  let rows = line.split(";");
  for (let i = 0; i < COLUMNS.length; i++) {
    const row = rows[i].trim();
    if (row !== "") {
      if (config.numeric[COLUMNS[i]]) {
        obj[COLUMNS[i]] = parseFloat(row);
      } else {
        obj[COLUMNS[i]] = row;
      }
    }
    
  }
  for (const k in config.default_data) {
    obj[k] = config.default_data[k];
  }
  obj.id = v4();
  arr.push(obj);
});
// const page = 10;
// function paginate(arr, size) {
//   return arr.reduce((acc, val, i) => {
//     let id = Math.floor(i / size);
//     let p = acc[id] || (acc[id] = []);
//     p.push(val);
//     return acc;
//   }, [])
// }
// const newArr = paginate(arr, page);
// let query = '';
// for (let i = 0; i < newArr.length; i++) {
//   const _arr = newArr[i];
//   const sql = jsonSql.build({ type: 'insert', table: TABLE_NAME, values: _arr });
//   query += sql.query;
// }
if (config.is_price_code) {
  const objBarcode = {};
  const priceId = {};
  const newArr = arr.map(el => {
    if (el.barcode !== objBarcode[el.barcode]) {
      el.price_code = priceId[el.barcode] = v4();
      objBarcode[el.barcode] = el.barcode;
    }
    return el;
  }).map(el => {
    if (!el.price_code && el.barcode === objBarcode[el.barcode]) {
      el.price_code = priceId[el.barcode];
    }
    return el;
  });
  arr = newArr;
}
const sql = jsonSql.build({ type: 'insert', table: TABLE_NAME, values: arr });
console.log("Inserting data...")
sequelize.query(sql.query, { type: QueryTypes.INSERT }).then(() => {
  console.log("Success...")
  console.log("Closing connection...")
  console.log("Please wait...")
}).catch(err => console.log(err.stack));

