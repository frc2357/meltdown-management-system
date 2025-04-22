resource "aws_s3_bucket_cors_configuration" "scouting_output_bucket" {
  bucket = aws_s3_bucket.scouting_output.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "DELETE"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }
}
