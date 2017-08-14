task :deps do
  sh 'npm install'
end

task build: :deps do
  sh 'npx react-scripts-ts build'
end

task test: :deps do
  sh 'npx react-scripts-ts test --env=jsdom'
end

task run: :deps do
  sh 'npx react-scripts-ts start'
end
