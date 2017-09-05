variable "domain" {}
variable "region" {}

provider "aws" {
  region = "${var.region}"
}

resource "aws_route53_zone" "z" {
  name = "${var.domain}"
}

resource "aws_route53_record" "txt" {
  zone_id = "${aws_route53_zone.z.zone_id}"
  name    = "${var.domain}"
  ttl     = 5
  type    = "TXT"
  records = ["google-site-verification=-pUVh2OF_SLYQTlifb-0WOG_Bzgh19ZVQwwxyRiLMVg"]
}

resource "aws_route53_record" "r" {
  zone_id = "${aws_route53_zone.z.zone_id}"
  name    = "${var.domain}"
  ttl     = 5
  type    = "A"
  records = ["151.101.1.195", "151.101.65.195"]
}

output "name_servers" {
  value = "${aws_route53_zone.z.name_servers}"
}
