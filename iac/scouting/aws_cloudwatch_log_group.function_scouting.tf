resource "aws_cloudwatch_log_group" "function_scouting" {
  name              = "/aws/lambda/${aws_lambda_function.scouting.function_name}"
  retention_in_days = 5
}
