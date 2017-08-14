provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "public" {
  bucket = "code2d.net"
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
