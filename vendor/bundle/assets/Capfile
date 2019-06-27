load 'deploy' if respond_to?(:namespace) # cap2 differentiator

# NOTE: The default capistrano asset tasks are not executed with bundler
# Uncomment if you are using Rails' asset pipeline
# load 'deploy/assets'

Dir['vendor/gems/*/recipes/*.rb','vendor/plugins/*/recipes/*.rb'].each { |plugin| load(plugin) }

# Add the lib directory to the load path
$:.unshift File.join(File.dirname(__FILE__),'lib')
require 'hesburgh_infrastructure/capistrano'

load 'config/deploy' # remove this line to skip loading any of the default tasks
