DOMAIN = 'code2d.net'.freeze
REGION = 'us-east-1'.freeze

TERRAFORM_VARS = "-var domain=#{DOMAIN} -var region=#{REGION}".freeze

task :build do
  cd 'app' do
    sh 'rake build'
  end
end

task :deploy do
  sh 'terraform init'
  sh 'terraform get'
  sh "terraform apply #{TERRAFORM_VARS}"

  cd 'app' do
    sh "BUCKET=#{DOMAIN} rake deploy"
  end

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
end
