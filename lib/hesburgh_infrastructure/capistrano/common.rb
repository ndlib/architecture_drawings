Capistrano::Configuration.instance(:must_exist).load do

  # Settings
  unset(:repository)
  _cset(:repository) { "git@git.library.nd.edu:#{application}" }
  _cset :use_sudo, false

  # SCM settings

  _cset :scm, :git
  _cset :deploy_via, :remote_cache

  # Settings for deployment with Jenkins
  _cset :scm_command, '/shared/git/bin/git'
  ssh_options[:paranoid] = false
  ssh_options[:keys] = %w(/shared/jenkins/.ssh/id_dsa)

  # Git settings for Capistrano
  default_run_options[:pty]     = true # needed for git password prompts

  _cset :application_symlinks, []
  _cset :default_symlinks, [
    '/log',
    '/vendor/bundle',
    '/config/database.yml'
  ]

  _cset(:symlink_targets) { default_symlinks + application_symlinks }

end
