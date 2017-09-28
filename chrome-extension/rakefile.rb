directory 'dist' do |t|
  rm_rf t.name
  cp_r 'public', t.name
end

directory 'dist/images' => 'dist'

task :deps do
  sh 'npm install'
end

task build: %i[deps dist/images] do
  sh 'npx rollup -c'

  [16, 19, 48, 128].each do |size|
    sh %W[inkscape
          --export-width #{size} --export-height #{size}
          --export-png dist/images/icon_#{size}.png
          ../images/icon.svg].join ' '
  end
end
