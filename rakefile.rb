DOCS_DIR = 'docs'.freeze

directory DOCS_DIR

rule '.js' => '.elm' do |t|
  sh "elm-make --yes --warn --output #{t.name} #{t.source}"
end

task build: File.join(DOCS_DIR, 'Main.js')

task :deploy do
  sh 'sls deploy -v'
end

task :remove do
  sh 'sls remove -v'
end

task :format do
  sh 'rubocop -a'
  sh 'elm-format --yes .' if `which elm-format` != ''
end

task :clean do
  sh 'git clean -dfx'
end
