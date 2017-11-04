task :deps do
  sh 'npm install'
end

task :build do
  sh 'npx webpack'
end

task :test do
  sh 'npx jest --coverage'
end

task :clean do
  sh 'git clean -dfx'
end
