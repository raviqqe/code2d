task :deps do
  sh 'npm install'
  # Supress warnings from node-unfluff module about a missing stopwords file
  # for Japanese.
  sh 'touch node_modules/unfluff/data/stopwords/stopwords-ja.txt'
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
