variable "domain" {
  default = "code2d.net"
}

provider "aws" {
  region = "us-east-1"
}

module "app" {
  source = "./app"
  domain = "${var.domain}"
}

resource "aws_route53_zone" "main" {
  name = "${var.domain}"
}

resource "aws_route53_record" "self" {
  zone_id = "${aws_route53_zone.main.zone_id}"
  name    = "${var.domain}"
  type    = "A"

  alias {
    name                   = "${module.app.domain}"
    zone_id                = "${module.app.zone_id}"
    evaluate_target_health = true
  }
}
