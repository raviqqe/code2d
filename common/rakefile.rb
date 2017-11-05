task :deps do
  sh 'npm install --ignore-scripts'
end

task build: :deps do
  sh 'npx tsc'
end

task test: :deps do
  sh 'npx jest --coverage'
end

task :clean do
  sh 'git clean -dfx'
end
