resource "aws_s3_bucket_policy" "scouting_output" {
  bucket = aws_s3_bucket.scouting_output.id
  policy = jsonencode(
    {
      Version = "2012-10-17"
      Statement = [
        {
          Sid       = "AllowSSLRequestsOnly"
          Effect    = "Deny"
          Principal = "*"
          Action    = "s3:*"
          Resource  = "${aws_s3_bucket.scouting_output.arn}",
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
            "s3:PutObject",
          ],
          Resource = "${aws_s3_bucket.scouting_output.arn}/*"
        },
        {
          Sid       = "AllowPublicGet",
          Effect    = "Allow",
          Principal = "*",
          Action    = ["s3:GetObject", "s3:ListBucket"],
          Resource = [
            "arn:aws:s3:::mms-dev-scouting-output/*",
            "arn:aws:s3:::mms-dev-scouting-output"
          ]
        }
      ]
    }
  )
}
