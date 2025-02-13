resource "aws_iam_policy" "function_scouting" {
  name = "${local.hidashNamePrefix}-function-scouting"
  policy = jsonencode(
    {
      Version = "2012-10-17"
      Statement = [
        {
          Effect = "Allow"
          Action = [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents",
          ],
          Resource = "*"
        }
      ]
    }
  )
}
