resource "aws_s3_bucket_notification" "scouting_trigger" {
  bucket = aws_s3_bucket.scouting_raw.id

  lambda_function {
    events              = ["s3:ObjectCreated:*"]
    lambda_function_arn = aws_lambda_function.scouting.arn
  }

  depends_on = [aws_lambda_permission.allow_scouting_trigger]
}
