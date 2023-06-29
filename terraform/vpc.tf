resource "aws_vpc" "new-vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "aprova-me-vpc"
  }
}

resource "aws_subnet" "new-subnet" {
  vpc_id                  = aws_vpc.new-vpc.id
  cidr_block              = "10.0.1.0/24" 
  availability_zone       = "us-west-1a"

  tags = {
    Name = "public-subnet"
  }
}

resource "aws_internet_gateway" "new-igw" {
  vpc_id = aws_vpc.new-vpc.id

  tags = {
    Name = "my-igw"
  }
}


resource "aws_vpc_attachment" "new-igwa" {
  vpc_id             = aws_vpc.new-vpc.id
  internet_gateway_id = aws_internet_gateway.new-igw.id
}


resource "aws_security_group" "sg" {
  vpc_id = aws_vpc.new-vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "sg"
  }
}

resource "aws_instance" "node_server" {
  ami           = "ami-053b0d53c279acc90" 
  instance_type = "t2.micro"               
  subnet_id     = aws_subnet.new-subnet.id
  key_name      = "aprova-me"
  security_group_ids = [aws_security_group.sg.id]

  tags = {
    Name = "node-server"
  }
}

# Create an ElastiCache Redis cluster
resource "aws_elasticache_cluster" "redis_cluster" {
  cluster_id           = "my-redis-cluster"  # Update with your desired cluster ID
  engine               = "redis"
  engine_version       = "6.x"
  node_type            = "cache.t2.micro"    # Update with your desired instance type
  num_cache_nodes      = 1                   # Update with your desired number of cache nodes
  parameter_group_name = "default.redis6.x"  # Update with your desired parameter group name
  port                 = 6379                # Update with your desired Redis port
  subnet_group_name    = "default"           # Update with your desired subnet group name

  tags = {
    Name = "redis-cluster"
  }
}