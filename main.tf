variable index_html {
  default = ""
}

variable style_css {
  default = ""
}

variable main_js {
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

resource "aws_s3_bucket_object" "style_css" {
  bucket = "${aws_s3_bucket.main.id}"
  key    = "style.css"
  source = "${var.style_css}"
  acl    = "public-read"
  content_type = "text/css"
}

resource "aws_s3_bucket_object" "main_js" {
  bucket = "${aws_s3_bucket.main.id}"
  key    = "main.js"
  source = "${var.main_js}"
  acl    = "public-read"
  content_type = "application/javascript"
}

resource "aws_s3_bucket_object" "gong_mp3" {
  bucket = "${aws_s3_bucket.main.id}"
  key    = "gong.mp3"
  source = "audio/gong.mp3"
  acl    = "public-read"
  content_type = "audio/mp3"
}
