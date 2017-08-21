variable "domain" {}
variable "region" {}

variable "origin_id" {
  default = "public_bucket"
}

provider "aws" {
  region = "${var.region}"
}

resource "aws_s3_bucket" "b" {
  bucket        = "${var.domain}"
  acl           = "private"
  force_destroy = true
}

resource "aws_cloudfront_distribution" "d" {
  origin {
    domain_name = "${aws_s3_bucket.b.bucket_domain_name}"
    origin_id   = "${var.origin_id}"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = ["${var.domain}"]

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "${var.origin_id}"
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = "arn:aws:acm:us-east-1:515821172331:certificate/c5a1e033-46e8-4441-a6f9-b4a7b1ab2b2e"
    minimum_protocol_version = "TLSv1"
    ssl_support_method       = "sni-only"
  }
}

resource "aws_route53_zone" "z" {
  name = "${var.domain}"
}

resource "aws_route53_record" "r" {
  zone_id = "${aws_route53_zone.z.zone_id}"
  name    = "${var.domain}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.d.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.d.hosted_zone_id}"
    evaluate_target_health = true
  }
}

output "name_servers" {
  value = "${aws_route53_zone.z.name_servers}"
}
