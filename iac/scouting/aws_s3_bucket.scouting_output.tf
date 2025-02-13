resource "aws_s3_bucket" "scouting_output" {
  lifecycle {
    prevent_destroy = true
  }
  bucket        = "${local.hidashNamePrefix}-scouting-output"
  force_destroy = true
}
