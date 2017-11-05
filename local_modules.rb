LOCAL_MODULES_DIR = 'local_modules'.freeze

def install_local_module(name)
  rm_rf LOCAL_MODULES_DIR
  mkdir_p LOCAL_MODULES_DIR
  cp_r File.join('..', name), File.join(LOCAL_MODULES_DIR, name)
  sh 'npm install ./local_modules/*'
end
