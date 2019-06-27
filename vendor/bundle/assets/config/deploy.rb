# Set the name of the application.  This is used to determine directory paths and domains
set :application, 'assets'

#############################################################
#  Application settings
#############################################################

# Defaults are set in lib/hesburgh_infrastructure/capistrano/common.rb

# Repository defaults to "git@git.library.nd.edu:#{application}"
# set :repository, "git@git.library.nd.edu:myrepository"

# Define symlinks for files or directories that need to persist between deploys.
# /log, /vendor/bundle, and /config/database.yml are automatically symlinked
# set :application_symlinks, ["/path/to/file"]
set :application_symlinks, [
  {"/log" => "/server/log"}
]

#############################################################
#  Environment settings
#############################################################

# Defaults are set in lib/hesburgh_infrastructure/capistrano/environments.rb

set :scm, 'git'
set :scm_command, '/usr/bin/git'

set :user, 'app'
set :ruby_bin, "/opt/ruby/current/bin"

desc "Setup for the Pre-Production environment"
task :pre_production do
  # Customize pre_production configuration
  set :deploy_to, "/home/app/#{application}"
  set :domain, "assetpprd-vm.library.nd.edu"
end

desc "Setup for the production environment"
task :production do
  # Customize production configuration
  set :deploy_to, "/home/app/#{application}"
  set :domain, "assetprod-vm.library.nd.edu"
end

#############################################################
#  Additional callbacks and tasks
#############################################################

# Define any addional tasks or callbacks here

desc "Restart Application"
task :restart_passenger do
  run "touch #{release_path}/server/tmp/restart.txt"
end

namespace :deploy do
  desc "Precompile assets"
  task :precompile do
    # The asset precompile task is scoped under app for the dummy server
    run "#{rake} app:hesburgh_assets:precompile"
  end
end

namespace :db do
  desc "Run the migrate rake task."
  task :migrate, :roles => :app do
    # No database for the assets application
  end
end
