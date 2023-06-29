terraform {
  required_version = ">=1.5.2"
  required_providers {
    aws   = ">=5.5.0"
    local = ">=2.4.0"
  }
}

provider "aws" {
  region = "us-east-1"
}