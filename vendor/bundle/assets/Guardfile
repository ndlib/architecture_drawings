require 'hesburgh_infrastructure'
# application_name must match an application in the hesburgh_infrastructure gem
# New applications must be added to config/applications.yml in hesburgh_infrastructure
hesburgh_guard = HesburghInfrastructure::Guard.new(:assets, self)

# Automatically compile CoffeeScript files
# https://github.com/guard/guard-coffeescript
hesburgh_guard.coffeescript

# Automatically install/update your gem bundle when needed
# https://github.com/guard/guard-bundler
hesburgh_guard.bundler gemspec: true do
  # Watch any custom paths
end

# Automatically start/restart your Rails development server
# https://github.com/ranmocy/guard-rails
hesburgh_guard.rails do
  # Watch any custom paths
end

# Intelligently start/reload your RSpec Drb spork server
# https://github.com/guard/guard-spork
hesburgh_guard.spork do
  # Watch any custom paths
end

# Automatically run your specs
# https://github.com/guard/guard-rspec
hesburgh_guard.rspec do
  # Watch any custom paths

  # Dummy server
  watch(%r{^server/app/(.+)\.rb$})                           { |m| "spec/#{m[1]}_spec.rb" }
  watch(%r{^server/app/(.*)(\.erb|\.haml)$})                 { |m| "spec/#{m[1]}#{m[2]}_spec.rb" }
  watch(%r{^server/app/controllers/(.+)_(controller)\.rb$})  { |m| ["spec/routing/#{m[1]}_routing_spec.rb", "spec/#{m[2]}s/#{m[1]}_#{m[2]}_spec.rb", "spec/acceptance/#{m[1]}_spec.rb"] }
end
