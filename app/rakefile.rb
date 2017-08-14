task :build do
  sh 'npx react-scripts-ts build'
end

task :test do
  sh 'npx react-scripts-ts test --env=jsdom'
end

task :run do
  sh 'npx react-scripts-ts start'
end
