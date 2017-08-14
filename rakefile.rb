task :build do
  cd 'app' do
    sh 'rake build'
  end
end

task deploy: :build do
  sh 'terraform apply'
end

task :clean do
  sh 'git clean -dfx'
end
