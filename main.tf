variable index_html {
  default = ""
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "main" {
  bucket = "work2d.raviqqe.com"
  acl    = "public-read"

  website {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket_object" "index_html" {
  bucket = "${aws_s3_bucket.main.id}"
  key    = "index.html"
  source = "${var.index_html}"
  acl    = "public-read"
  content_type = "text/html"
}
