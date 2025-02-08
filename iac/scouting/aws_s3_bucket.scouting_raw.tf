resource "aws_s3_bucket" "scouting_raw" {
  lifecycle {
    prevent_destroy = true
  }
  bucket        = "${local.hidashNamePrefix}-scouting-raw"
  force_destroy = true
}
