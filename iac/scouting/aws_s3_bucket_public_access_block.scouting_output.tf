resource "aws_s3_bucket_public_access_block" "scouting_output" {
  bucket = aws_s3_bucket.scouting_output.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
