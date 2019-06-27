$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "hesburgh_assets/version"

# Describe your s.add_development_dependency and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = %q{hesburgh_assets}
  s.version     = HesburghAssets::VERSION
  s.authors     = ["Jaron Kennel"]
  s.email       = ["jkennel@nd.edu"]
  s.homepage    = "http://library.nd.edu"
  s.summary     = %q{hesburgh_assets provides an up-to-date source for Hesburgh Library
                      assets and layouts.}
  s.description = %q{hesburgh_assets provides an up-to-date source for Hesburgh Library
                      assets and layouts - images, stylesheets, javascripts and layout files}

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", ">= 3.2.13"
  s.add_dependency "jquery-rails", '>= 2.1.4'
  s.add_dependency "twitter-bootstrap-rails"
  s.add_dependency 'sass-rails',   '>= 3.2.3'
  s.add_dependency 'coffee-rails', '>= 3.2.1'
  s.add_dependency 'uglifier', '>= 1.0.3'

  s.add_development_dependency 'rspec-rails'
  s.add_development_dependency 'capybara'

  s.add_development_dependency 'guard-rspec'
  s.add_development_dependency 'guard-coffeescript'
  s.add_development_dependency 'guard-rails'
  s.add_development_dependency 'guard-bundler'
  s.add_development_dependency 'guard-spork'
  s.add_development_dependency 'growl'
  s.add_development_dependency 'rb-readline'
end
