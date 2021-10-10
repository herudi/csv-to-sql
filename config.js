exports.config = {
  csv_file: __dirname + "/item_category.csv",
  table_name: "hmt_item_category",
  columns: [
    "item_category_id",
    "company_id",
    "name",
    "description",
    "status",
    "created_by",
    "updated_by"
  ],
  default_data: {
    "created_at": new Date().toISOString(),
    "updated_at": new Date().toISOString()
  }
}

exports.connection = {
  user: 'postgres',
  host: 'localhost',
  database: 'manuser_dev',
  password: 'qwerty90',
  port: 5432,
}