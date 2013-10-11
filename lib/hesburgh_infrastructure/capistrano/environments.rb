Capistrano::Configuration.instance(:must_exist).load do

  # Environments
  _cset :relative_ruby_path, "ruby/1.9.3/bin"
  _cset(:deploy_directory) { application }

  after 'pre_production', 'environments:pre_production_defaults', 'environments:defaults'
  after 'production', 'environments:production_defaults', 'environments:defaults'
  before 'pre_production', 'environments:clear_defaults'
  before 'production', 'environments:clear_defaults'

  desc "Setup for the Pre-Production environment"
  task :pre_production do
  end

  desc "Setup for the production environment"
  task :production do
  end

  namespace :environments do

    desc "Clear capistrano defaults"
    task :clear_defaults do
      unset :rails_env
      unset :deploy_to
      unset :rake
    end

    desc "Default configuration for the pre_production environment"
    task :pre_production_defaults do
      _cset :rails_env, 'pre_production'
      _cset :user,      'rbpprd'
      _cset :home_path, "/shared/ruby_pprd"
      _cset :domain,    "rpprd.library.nd.edu"
    end

    desc "Default configuration for the production environment"
    task :production_defaults do
      _cset :rails_env, 'production'
      _cset :user,      'rbprod'
      _cset :home_path, "/shared/ruby_prod"
      _cset :domain,    "rprod.library.nd.edu"
    end

    desc "Common default configuration for all environments"
    task :defaults do
      _cset :deploy_to,     "#{home_path}/data/app_home/#{deploy_directory}"
      _cset :ruby_bin,      "#{home_path}/#{relative_ruby_path}"
      _cset :ruby,          File.join(ruby_bin, 'ruby')
      _cset :bundler,        File.join(ruby_bin, 'bundle')
      _cset :binstubs_path,  File.join(shared_path, 'vendor/bundle/bin')
      _cset :rake,      "cd #{release_path}; #{bundler} exec #{File.join(binstubs_path, 'rake')} RAILS_ENV=#{rails_env}"

      server "#{user}@#{domain}", :app, :web, :db, :primary => true
    end
  end
end
