task :build do
  sh 'npx tsc'
end

task test: :build do
  sh 'npx jest'
end
