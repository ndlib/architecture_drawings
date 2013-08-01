# Set the name of the application.  This is used to determine directory paths and domains
set :application, 'architecture_drawings'

#############################################################
#  Application settings
#############################################################

# Defaults are set in lib/hesburgh_infrastructure/capistrano/common.rb

# Repository defaults to "git@git.library.nd.edu:#{application}"
# set :repository, "git@git.library.nd.edu:myrepository"

# Define symlinks for files or directories that need to persist between deploys.
# /log, /vendor/bundle, and /config/database.yml are automatically symlinked
# set :application_symlinks, ["/path/to/file"]

#############################################################
#  Environment settings
#############################################################

# Defaults are set in lib/hesburgh_infrastructure/capistrano/environments.rb

desc "Setup for the Pre-Production environment"
task :pre_production do
  # Customize pre_production configuration
  set :domain,    "rpprd.library.nd.edu"
end

desc "Setup for the production environment"
task :production do
  # Customize production configuration
  set :domain,    "rprod.library.nd.edu"
end

#############################################################
#  Additional callbacks and tasks
#############################################################

# Define any addional tasks or callbacks here

namespace :db do
    task :migrate, :roles => :app do
      # Temporarily disable the migrate task
    end
  end
