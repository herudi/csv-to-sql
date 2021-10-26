const { Sequelize } = require("sequelize");

exports.config = {
  // I for insert, U for update
  action: "U",
  // load csv file
  csv_file: __dirname + "/selling_price_branch.csv",
  // table name
  table_name: "hmt_items_selling_price",
  // default data before execute
  default_data: {
    "created_at": new Date().toISOString(),
    "updated_at": new Date().toISOString()
  },
  // mutating price code 
  is_price_code: true,
  // put the numeric field as object
  numeric: {
    percent_profit: true,
    vat: true,
    selling_price_not_vat: true,
    selling_price: true,
    profit: true
  }
}

const connection = {
  username: 'postgres',
  host: 'localhost',
  database: 'sihemat_retail_staging',
  password: 'passwd',
  port: 5432,
  dialect: 'postgres',
  //pool
  dialectOptions: {
    multipleStatements: true,
    // statement_timeout: 3000,
    // idle_in_transaction_session_timeout: 5000
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 20000,
    handleDisconnects: true
  },
  logging: false
}
exports.sequelize = new Sequelize(connection)
