provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = {
      Application = "payable"
      Name        = "${terraform.workspace}-payable"
    }
  }
}
