task :deps do
  sh 'npm install'
end

task build: :deps do
  sh 'npx webpack'
end

task test: :deps do
  sh 'npx jest --coverage'
end

task :clean do
  sh 'git clean -dfx'
end
