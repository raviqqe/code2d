index_html = 'build/client/index.html'

file index_html => Dir.glob('src/client/**/*.elm') do |t|
  sh "elm-make --yes --warn --output #{t.name} src/client/Main.elm"
end

%i(apply plan).each do |name|
  task name => index_html do
    sh "terraform #{name} -var index_html=#{index_html}"
  end
end

task :destroy do
  sh 'terraform destroy -force'
end

task :format do
  sh 'rubocop -a'
end

task :clean do
  sh 'git clean -dfx'
end
