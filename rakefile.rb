PROJECT_ID = 'work2d-162714'.freeze
DOMAIN = 'code2d.net'.freeze
REGION = 'us-east-1'.freeze

TERRAFORM_VARS = "-var domain=#{DOMAIN} -var region=#{REGION}".freeze

task :test do
  %w[app functions].each do |dir|
    cd dir do
      sh 'rake test'
    end
  end
end

task :build do
  cd 'app' do
    sh 'rake build'
  end

  cd 'functions' do
    sh 'rake build'
  end
end

task deploy: :build do
  sh 'terraform init'
  sh 'terraform get'
  sh "terraform apply #{TERRAFORM_VARS}"

  sh 'firebase deploy'
  sh "gsutil cors set storage_cors.json gs://#{PROJECT_ID}.appspot.com"

  name_servers = `terraform output name_servers`
                 .split(/[,\s]+/)
                 .map { |s| 'Name=' + s }
                 .join ' '

  sh %W[
    aws route53domains update-domain-nameservers
    --domain #{DOMAIN}
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
