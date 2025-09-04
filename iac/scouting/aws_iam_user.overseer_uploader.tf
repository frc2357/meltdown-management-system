resource "aws_iam_user" "overseer_uploader" {
  name = "${local.hidashNamePrefix}-overseer-uploader"
}
