exports.config = {
  csv_file: __dirname + "/item_category.csv",
  table_name: "hmt_item_category",
  default_data: {
    "created_at": new Date().toISOString(),
    "updated_at": new Date().toISOString()
  },
  is_price_code: true
}

exports.connection = {
  user: 'postgres',
  host: 'host',
  database: 'cloudritel_test',
  password: 'pass',
  port: 5432,
}
