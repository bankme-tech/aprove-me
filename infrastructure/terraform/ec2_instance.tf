resource "aws_instance" "instance" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t3.micro"
  vpc_security_group_ids = [aws_security_group.allow_web.id]

  tags = {
    Environment = terraform.workspace
  }

  user_data = file("${path.module}/scripts/user_data.sh")
}

resource "aws_security_group" "allow_web" {
  name        = "${terraform.workspace}-allow-web"
  description = "allow web for ${terraform.workspace}"
  vpc_id      = data.aws_vpc.default.id
}

resource "aws_security_group_rule" "allow_web" {
  type              = "ingress"
  from_port         = local.port
  to_port           = local.port
  protocol          = "tcp"
  cidr_blocks       = local.external_cidr_blocks
  security_group_id = aws_security_group.allow_web.id
}
