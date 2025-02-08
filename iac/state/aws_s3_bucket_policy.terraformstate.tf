resource "aws_s3_bucket_policy" "terraformstate" {
  bucket = aws_s3_bucket.terraformstate.id
  policy = jsonencode(
    {
      Version = "2012-10-17"
      Statement = [
        {
          Sid       = "AllowSSLRequestsOnly"
          Effect    = "Deny"
          Principal = "*"
          Action    = "s3:*"
          Resource  = "${aws_s3_bucket.terraformstate.arn}",
          Condition = {
            Bool = {
              "aws:SecureTransport" = "false"
            }
          }
        }
      ]
    }
  )
}
