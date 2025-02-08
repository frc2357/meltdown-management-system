variable "awsRegion" {
  type        = string
  description = "value of the AWS region"
}

variable "appId" {
  type        = string
  description = "App ID"
}

variable "environment" {
  type        = string
  description = "Environment [dev, prod]"
  validation {
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "Environment must be either dev or prod."
  }
}
