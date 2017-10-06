variable "domain" {}
variable "region" {}
variable "google_site_verification" {}

variable "addresses" {
  type = "list"
}

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
  records = ["google-site-verification=${var.google_site_verification}"]
}

resource "aws_route53_record" "r" {
  zone_id = "${aws_route53_zone.z.zone_id}"
  name    = "${var.domain}"
  ttl     = 5
  type    = "A"
  records = "${var.addresses}"
}

output "name_servers" {
  value = "${aws_route53_zone.z.name_servers}"
}
