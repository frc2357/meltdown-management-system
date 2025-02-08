resource "aws_iam_policy_attachment" "function_scouting" {
  name       = "${local.hidashNamePrefix}-function-scouting"
  policy_arn = aws_iam_policy.function_scouting.arn
  roles      = [aws_iam_role.function_scouting.name]
}
