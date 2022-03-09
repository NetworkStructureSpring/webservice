packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}
variable "amiName" {
  type    = string
  default = ""
}

variable "region" {
  type    = string
  default = "us-east-1"
}

variable "instance" {
  type    = string
  default = "t2.micro"
}

variable "sshUsername" {
  type    = string
  default = "ec2-user"
}

variable "aws_access_key" {
  type    = string
  default = ""
}

variable "aws_secret_key" {
  type    = string
  default = ""
}
variable "aws_acct_list" {
  type    = list(string)
  default = []
} 

source "amazon-ebs" "ami-image" {
  ami_name      = "AMI{{timestamp}}"
  instance_type = "${var.instance}"  
  region        = "${var.region}"  
  #ami_users     = "${var.aws_acct_list}"
  source_ami_filter {
    filters = {
      name                = "amzn2-ami-kernel-5.10-hvm-2.0.20220207.1-x86_64-gp2"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["amazon"]
  }
  access_key   = "${var.aws_access_key}"
  secret_key   = "${var.aws_secret_key}"
  ssh_username = "${var.sshUsername}"
}

build {
  sources = [
    "source.amazon-ebs.ami-image",
  ]
  provisioner "file" {
    source = "./webservice.zip"
    destination = "~/"
  }
  provisioner "shell"{
    script = "./postgres.sh"
  }
}
