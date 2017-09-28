directory 'images'

task :deps do
  sh 'npm install'
end

task build: %i[deps images] do
  sh 'npx rollup -c'

  [16, 19, 48, 128].each do |size|
    sh %W[inkscape
          --export-width #{size} --export-height #{size}
          --export-png images/icon_#{size}.png
          ../images/icon.svg].join ' '
  end
end
