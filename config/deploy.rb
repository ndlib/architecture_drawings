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

set :scm, "git"
set :scm_command, '/usr/bin/git'

#set :repository, 'ndlib-git@github.com:ndlib/architecture_drawings.git'

set :user, 'app'
set :ruby_bin, "/opt/ruby/current/bin"

set :deploy_directory, "drawings"

desc "Setup for the Pre-Production environment"
task :pre_production do
  # Customize pre_production configuration
  set :deploy_to, "/home/app/#{deploy_directory}"
  set :domain, "drawings-pprd.library.nd.edu"
end

desc "Setup for the production environment"
task :production do
  # Customize production configuration
  set :deploy_to, "/home/app/#{deploy_directory}"
  set :domain, "drawings.library.nd.edu"
end

#############################################################
#  Additional callbacks and tasks
#############################################################

# Define any addional tasks or callbacks here

require 'deploy/whenever'

namespace :deploy do

  desc "Reload the Solr configuration"
  task :reload_solr_core, :roles => :app do
    solr_config = YAML.load_file("config/solr.yml")[rails_env.to_s]
    core_url = solr_config["url"]
    core_regex = /[^\/]+$/
    core_name = core_url.match(core_regex)[0]
    base_solr_url = core_url.gsub(core_regex,'')
    reload_url = base_solr_url + "admin/cores?action=RELOAD&core=" + core_name
    puts "Reloading solr core: #{reload_url}"
    run "curl -I -A \"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)\" \"#{reload_url}\""
  end
end

after 'restart_passenger', 'deploy:reload_solr_core'
