task :deps do
  sh 'npm install'
end

task build: :deps do
  sh 'npx tsc'
end

task test: :deps do
  # Prevent burst requests to Rakuten Web Service.
  sh 'npx jest --coverage --maxWorkers 1'
end

task :clean do
  sh 'git clean -dfx'
end
