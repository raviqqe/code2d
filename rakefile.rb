task :apply do
  sh 'terraform apply'
end

task :plan do
  sh 'terraform plan'
end

task :destroy do
  sh 'terraform destroy -force'
end

task :format do
  sh 'rubocop -a'
end

task :clean do
  sh 'git clean -dfx'
end
