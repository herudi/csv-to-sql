exports.config = {
  csv_file: __dirname + "/item_sub_category.csv",
  table_name: "hmt_item_sub_category",
  columns: [
    "item_sub_category_id",
    "item_category_id",
    "name",
    "description",
    "status",
    "created_by"
  ],
  default_data: {
    "created_at": new Date().toISOString(),
    "updated_at": new Date().toISOString()
  }
}

exports.connection = {
  user: 'postgres',
  host: 'host',
  database: 'db',
  password: 'pass',
  port: 5432,
}