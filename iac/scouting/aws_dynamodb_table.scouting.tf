resource "aws_dynamodb_table" "scouting" {
  name      = "${local.hidashNamePrefix}-scouting"
  hash_key  = "event"
  range_key = "team-match"

  billing_mode   = "PROVISIONED"
  read_capacity  = (var.environment == "dev" ? 5 : 20)
  write_capacity = (var.environment == "dev" ? 5 : 20)

  stream_enabled = false

  attribute {
    name = "event"
    type = "S"
  }

  attribute {
    name = "team-match"
    type = "S"
  }
}
