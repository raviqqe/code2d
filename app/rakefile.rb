task :deps do
  rm_rf 'local_modules'
  mkdir_p 'local_modules'
  cp_r '../common', 'local_modules/common'
  sh 'npm install ./local_modules/common'
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
  sh 'npx workbox generate:sw'
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
