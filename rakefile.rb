DOMAIN = 'code2d.net'.freeze
REGION = 'us-east-1'.freeze

task :build do
  cd 'app' do
    sh 'rake build'
  end
end

task deploy: :build do
  sh 'terraform init'
  sh 'terraform get'
  sh "terraform apply -var domain=#{DOMAIN} -var region=#{REGION}"

  cd 'app' do
    sh "BUCKET=#{DOMAIN} rake deploy"
  end
end

task :clean do
  sh 'git clean -dfx'
end
