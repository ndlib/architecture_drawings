Capistrano::Configuration.instance(:must_exist).load do

  #############################################################
  #  Callbacks
  #############################################################

  after 'deploy:update_code',
    'deploy:create_symlink_shared',
    'bundle:install',
    'deploy:precompile'

  after 'deploy',
    'deploy:cleanup',
    'restart_passenger'

  #############################################################
  #  Passenger
  #############################################################

  desc "Restart Application"
  task :restart_passenger do
    run "touch #{release_path}/tmp/restart.txt"
  end

  #############################################################
  #  Deploy
  #############################################################

  namespace :deploy do

    task :stop, :roles => :app do
      # Do nothing.
    end

    desc "Symlink shared configs and folders on each release."
    task :create_symlink_shared do
      symlink_targets.each do | target |
        if target.is_a?(Hash)
          source      = target.keys.first
          destination = target.values.first
        else
          source = target
          destination = target
        end

        destination_path = File.join( release_path, destination)
        destination_directory = File.dirname(destination_path)

        run "rm -rf #{destination_path}"
        run "mkdir -p #{destination_directory}"
        run "ln -nvfs #{File.join( shared_path, source)} #{destination_path}"
      end
    end

    desc "Precompile assets"
    task :precompile do
      run "#{rake} assets:precompile"
    end

    desc "Execute various commands on the remote environment"
    task :debug, :roles => :app do
      run "/usr/bin/env", :pty => false, :shell => '/bin/bash'
      run "whoami"
      run "pwd"
      run "echo $PATH"
      run "which ruby"
      run "ruby --version"
    end
  end

  namespace :bundle do
    desc "Install gems in Gemfile"
    task :install, :roles => :app do
      run "#{bundler} install --binstubs='#{binstubs_path}' --shebang '#{ruby}' --gemfile='#{release_path}/Gemfile' --without development test --deployment"
    end
  end
end
