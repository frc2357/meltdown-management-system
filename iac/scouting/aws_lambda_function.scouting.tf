resource "aws_lambda_function" "scouting" {
  function_name = "${local.hidashNamePrefix}-scouting"
  description   = "Lambda function to ETL match data into Dynamo"
  role          = aws_iam_role.function_scouting.arn
  filename      = "./_blank_function_code/blank.zip"
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.13"

  timeout     = 30
  memory_size = 128

  environment {
    variables = {
      ENVIRONMENT = "${var.environment}"
    }
  }
}
