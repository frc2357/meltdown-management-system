resource "aws_iam_user_policy" "overseer_uploader" {
  name = "${local.hidashNamePrefix}-overseer-uploader"
  user = aws_iam_user.overseer_uploader.name
  policy = jsonencode(
    {
      Version = "2012-10-17"
      Statement = [
        {
          Effect = "Allow"
          Action = [
            "s3:PutObject",
          ],
          Resource = "${aws_s3_bucket.scouting_raw.arn}/*"
        }
      ]
    }
  )
}
