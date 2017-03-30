main_js = 'build/client/main.js'

file main_js => Dir.glob('src/client/**/*.elm') do |t|
  sh "elm-make --yes --warn --output #{t.name} src/client/Main.elm"
end

%i(apply plan).each do |name|
  task name => main_js do |t|
    sh "terraform #{name} "\
       '-var index_html=src/client/index.html '\
       '-var style_css=src/client/style.css '\
       "-var main_js=#{t.source}"
  end
end

task :destroy do
  sh 'terraform destroy -force'
end

task update: %i(destroy apply)

task :format do
  sh 'rubocop -a'
  sh 'elm-format --yes .' if `which elm-format` != ''
end

task :clean do
  sh 'git clean -dfx'
end
