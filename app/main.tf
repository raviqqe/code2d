variable "domain" {}

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
  source       = "${path.module}/build/index.html"
  content_type = "text/html"
  acl          = "public-read"
}

output "domain" {
  value = "${aws_s3_bucket.public.website_domain}"
}

output "zone_id" {
  value = "${aws_s3_bucket.public.hosted_zone_id}"
}
