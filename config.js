exports.config = {
  csv_file: __dirname + "/item_category.csv",
  table_name: "hmt_item_category",
  default_data: {
    "created_at": new Date().toISOString(),
    "updated_at": new Date().toISOString()
  }
}

exports.connection = {
  user: 'postgres',
  host: 'asd',
  database: 'asd',
  password: 'asd',
  port: 5432,
}