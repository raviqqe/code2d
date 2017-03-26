task :deploy

task :format do
  sh 'rubocop -a'
end

task :clean do
  sh 'git clean -dfx'
end
