require 'json'

CONFIG = JSON.parse File.read('config.json')
HOSTING = CONFIG['firebase']['hosting']

TERRAFORM_VARS = %W[
  -var domain=#{CONFIG['domain']}
  -var region=#{CONFIG['aws']['region']}
  -var google_site_verification=#{HOSTING['googleSiteVerification']}
  -var addresses='#{HOSTING['addresses']}'
].join ' '

SCREENSHOTS = %w[tasks articles videos].map do |name|
  "images/screenshots/#{name}.png"
end

def original_png_path(path)
  File.join File.dirname(path), 'original', File.basename(path)
end

rule %r{images/screenshots/[^/]+\.png} => method(:original_png_path) do |t|
  sh "pngquant -o #{t.name} #{t.source}"
end

task :test do
  %w[domain app functions].each do |dir|
    cd dir do
      sh 'rake test'
    end
  end
end

task build: SCREENSHOTS do
  sh %w[inkscape
        --export-width 128 --export-height 128
        --export-png images/notification.png
        images/icon.svg].join ' '

  %w[domain app functions chrome-extension].each do |dir|
    cd dir do
      sh 'rake build'
    end
  end
end

task deploy: :build do
  sh 'terraform init'
  sh 'terraform get'
  sh "terraform apply #{TERRAFORM_VARS}"

  sh 'firebase deploy'
  sh %W[gsutil cors set
        storage_cors.json
        gs://#{CONFIG['firebase']['projectId']}.appspot.com].join ' '

  name_servers = `terraform output name_servers`
                 .split(/[,\s]+/)
                 .map { |s| 'Name=' + s }
                 .join ' '

  sh %W[
    aws route53domains update-domain-nameservers
    --domain #{CONFIG['domain']}
    --nameservers #{name_servers}
  ].join ' '
end

task :withdraw do
  sh "terraform destroy #{TERRAFORM_VARS}"
end

task :clean do
  cd 'app' do
    sh 'rake clean'
  end

  cd 'functions' do
    sh 'rake clean'
  end
end
