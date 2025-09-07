resource "aws_iam_access_key" "overseer_uploader" {
  user = aws_iam_user.overseer_uploader.name
}
