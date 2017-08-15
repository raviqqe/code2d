variable "domain" {}
variable "region" {}

provider "aws" {
  region = "${var.region}"
}

resource "aws_s3_bucket" "public" {
  bucket = "${var.domain}"
  acl    = "public-read"

  website = {
    index_document = "index.html"
  }
}

resource "aws_route53_zone" "main" {
  name = "${var.domain}"
}

resource "aws_route53_record" "self" {
  zone_id = "${aws_route53_zone.main.zone_id}"
  name    = "${var.domain}"
  type    = "A"

  alias {
    name                   = "${aws_s3_bucket.public.website_domain}"
    zone_id                = "${aws_s3_bucket.public.hosted_zone_id}"
    evaluate_target_health = true
  }
}
