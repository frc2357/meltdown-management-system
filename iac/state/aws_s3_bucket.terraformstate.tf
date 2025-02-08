resource "aws_s3_bucket" "terraformstate" {
  lifecycle {
    prevent_destroy = true
  }
  bucket        = "${local.hidashNamePrefix}-terraformstate"
  force_destroy = true
}
