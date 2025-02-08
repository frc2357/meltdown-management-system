resource "aws_lambda_permission" "allow_scouting_trigger" {
  statement_id  = "allow-execution-${aws_s3_bucket.scouting_raw.bucket}-to-${aws_lambda_function.scouting.function_name}"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.scouting.arn
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.scouting_raw.arn
}
