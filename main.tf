variable "domain" {
  default = "code2d.net"
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "public" {
  bucket = "${var.domain}"
  acl    = "public-read"

  website = {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket_object" "object" {
  bucket       = "${aws_s3_bucket.public.id}"
  key          = "index.html"
  source       = "index.html"
  content_type = "text/html"
  acl          = "public-read"
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
