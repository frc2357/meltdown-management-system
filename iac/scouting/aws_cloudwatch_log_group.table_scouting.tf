resource "aws_cloudwatch_log_group" "table_scouting" {
  name              = "/aws/dynamodb/${aws_dynamodb_table.scouting.name}"
  retention_in_days = 5
}
