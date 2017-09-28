task :build do
  sh 'npx rollup -c'

  sh %w[inkscape
        --export-width 19 --export-height 19
        --export-png icon.png
        ../images/icon.svg].join ' '
end
