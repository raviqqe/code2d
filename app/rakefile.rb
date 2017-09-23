task :deps do
  sh 'npm install'
end

task build: :deps do
  sh %w[inkscape
        --export-width 16 --export-height 16
        --export-png public/favicon.png
        ../images/icon.svg].join ' '
  sh %w[inkscape
        --export-width 192 --export-height 192
        --export-png public/icon.png
        ../images/icon.svg].join ' '

  sh 'npx node-sass-chokidar src -o src'
  sh 'npx react-scripts-ts build'
end

task test: :deps do
  sh 'CI=true npx react-scripts-ts test --coverage --env=jsdom'
end

task run: :build do
  sh 'npx node-sass-chokidar src -o src --watch --recursive &'
  sh 'npx react-scripts-ts start'
end

task :clean do
  sh 'git clean -dfx'
end
