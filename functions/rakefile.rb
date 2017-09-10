task :deps do
  sh 'npm install'
end

task build: :deps do
  sh 'npx tsc'
end

task test: :build do
  sh 'npx jest'
end
