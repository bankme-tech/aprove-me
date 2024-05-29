terraform {
  required_providers {
    digitalocean = {
        source = "digitalocean/digitalocean"
    }
  }
}

# DIGITALOCEAN RESOURCES

variable "do_token" {
  type = string
  default = "" # digital ocean api token
  sensitive = true
}

variable "cluster_name" {
  type = string
  default = "bankme-k8s"
}

variable "k8s_version" {
  type = string
  default = "1.30.1-do.0"
}

variable "region" {
  type = string
  default = "syd1" # Sydney
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_kubernetes_cluster" "bankme-k8s" {
  name = var.cluster_name
  region = var.region
  version = var.k8s_version

  node_pool {
    name = "worker-pool"
    size = "s-2vcpu-4gb"
    auto_scale = false
    node_count = 1
  }
}
