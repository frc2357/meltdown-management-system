resource "aws_s3_bucket_policy" "scouting_raw" {
  bucket = aws_s3_bucket.scouting_raw.id
  policy = jsonencode(
    {
      Version = "2012-10-17"
      Statement = [
        {
          Sid       = "AllowSSLRequestsOnly"
          Effect    = "Deny"
          Principal = "*"
          Action    = "s3:*"
          Resource  = "${aws_s3_bucket.scouting_raw.arn}",
          Condition = {
            Bool = {
              "aws:SecureTransport" = "false"
            }
          }
        },
        {
          Sid    = "AllowFunctionScoutingRole",
          Effect = "Allow",
          Principal = {
            AWS = "${aws_iam_role.function_scouting.arn}"
          },
          Action = [
            "s3:GetObject",
          ],
          Resource = "${aws_s3_bucket.scouting_raw.arn}/*"
        }
      ]
    }
  )
}
