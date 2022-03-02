packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

source "amazon-ebs" "ami-image" {
  ami_name      = "testAMItest"
  instance_type = "t2.micro"
  region        = "us-east-1"
  source_ami_filter {
    filters = {
      name                = "amzn2-ami-kernel-5.10-hvm-2.0.20220207.1-x86_64-gp2"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["amazon"]
  }
  launch_block_device_mappings {
    device_name           = "/dev/xvda"
    volume_type           = "gp2"
    volume_size           = "8"
    delete_on_termination = true
  }
  access_key   = "AKIA256ELQTI43QQ7NPC"
  secret_key   = "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"
  ssh_username = "ec2-user"
}

build {
  sources = [
    "source.amazon-ebs.ami-image",
  ]
  provisioner "file" {
    source = "webservice.zip"
    destination = "~/"
  }
  provisioner "shell"{
    script = "./postgress.sh"
    
  }




}
