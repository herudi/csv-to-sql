
//config
const INPUT_FILE = __dirname + "/item_category.csv";
const OUT_FILE = __dirname + "/item_category.sql";
const TABLE_NAME = "hmt_item_category";
const HEADERS = [
  "item_category_id",
  "company_id",
  "name",
  "description",
  "status",
  "created_by",
  "updated_by",
  "created_at@date",
  "updated_at@date"
];
const ID_AS_UUID = true;
const UUID_FN_NAME = "gen_random_uuid()";


//start code
const fs = require("fs");
const jsonSql = require("json-sql")({
  namedValues: false,
  separatedValues: false,
  dialect: 'postgresql'
});

const iFile = fs.readFileSync(INPUT_FILE, "utf-8");
const lines = iFile.split("\n");
let arr = [];
lines.forEach((line) => {
  let obj = {}
  let row = line.split(";")
  for (let i = 0; i < HEADERS.length; i++) {
    if (HEADERS[i].lastIndexOf("@date") !== -1) {
      let el = HEADERS[i].split("@")[0];
      obj[el] = new Date(row[i]).toISOString();
    } else {
      obj[HEADERS[i]] = row[i];
    }
  }
  arr.push(obj);
});
String.prototype.replaceAll = function(str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 
if (ID_AS_UUID) {
  const muts = arr.map(el => ({ id: UUID_FN_NAME, ...el }));
  arr = muts;
}
const sql = jsonSql.build({ type: 'insert', table: TABLE_NAME, values: arr });
let outStr = sql.query;
if (ID_AS_UUID) {
  outStr = outStr.replaceAll(`'${UUID_FN_NAME}'`, UUID_FN_NAME)
}
outStr = outStr.replace(/[\r\n]+/g, "");
fs.writeFileSync(OUT_FILE, outStr)
