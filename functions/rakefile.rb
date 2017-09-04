task :build do
  sh 'tsc'
end

task test: :build do
  sh 'npx jest'
end
