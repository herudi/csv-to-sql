const { Sequelize } = require("sequelize");

exports.config = {
  csv_file: __dirname + "/item_category.csv",
  table_name: "hmt_item_category",
  default_data: {
    "created_at": new Date().toISOString(),
    "updated_at": new Date().toISOString()
  },
  is_price_code: false,
  numeric: {}
}

const connection = {
  username: 'postgres',
  host: 'localhost',
  database: 'manuser_dev',
  password: 'qwerty90',
  port: 5432,
  dialect: 'postgres',
  //pool
  dialectOptions: {
    multipleStatements: true,
    statement_timeout: 3000,
    idle_in_transaction_session_timeout: 5000
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
