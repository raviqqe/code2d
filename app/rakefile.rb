task :deps do
  sh 'npm install'
end

task build: :deps do
  sh 'npx node-sass-chokidar src -o src'
  sh 'npx react-scripts-ts build'
end

task test: :deps do
  sh 'CI=true npx react-scripts-ts test --env=jsdom'
end

task run: :build do
  sh 'npx node-sass-chokidar src -o src --watch --recursive &'
  sh 'npx react-scripts-ts start'
end

task :clean do
  sh 'git clean -dfx'
end
