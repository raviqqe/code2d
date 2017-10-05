require 'json'

config = JSON.parse File.read('config.json')

TERRAFORM_VARS = %W[-var domain=#{config['domain']}
                    -var region=#{config['aws']['region']}].join ' '

task :test do
  %w[app functions].each do |dir|
    cd dir do
      sh 'rake test'
    end
  end
end

task :build do
  %w[app functions chrome-extension].each do |dir|
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
        gs://#{config['firebase']['projectId']}.appspot.com].join ' '

  name_servers = `terraform output name_servers`
                 .split(/[,\s]+/)
                 .map { |s| 'Name=' + s }
                 .join ' '

  sh %W[
    aws route53domains update-domain-nameservers
    --domain #{config['domain']}
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
