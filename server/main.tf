provider "aws" {
  region  = "us-east-1"
  profile = "GuiDev"
}

module "ec2_instance" {
  source  = "terraform-aws-modules/ec2-instance/aws"
  version = "~> 3.0"

  name = "my-instance-terraform-bankme"

  ami                    = "ami-006dcf34c09e50022"
  instance_type          = "t2.micro"
  key_name               = "gui-dev"
  monitoring             = true
  vpc_security_group_ids = ["sg-0188f8959e5bd6f0c"]
  subnet_id              = "subnet-020fc509bf653db3e"

  tags = {
    Terraform   = "true"
    Environment = "dev"
    Autor       = "Guilherme Braga"
  }
}