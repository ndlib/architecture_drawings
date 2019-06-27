module HesburghAssets
  class Engine < ::Rails::Engine
    isolate_namespace HesburghAssets

    require 'twitter-bootstrap-rails'
    require 'jquery-rails'

    config.generators do |g|
      g.test_framework :rspec, :view_specs => false
    end
  end
end
