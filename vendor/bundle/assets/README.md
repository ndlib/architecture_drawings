# Hesburgh Web Assets

Hesburgh Assets is the central repository for common web assets including layout templates, stylesheets, javascript, and images.  It is a dual purpose application, functioning as both a rails gem and an asset server.

## Installation

Add it to your `Gemfile`

```ruby
gem 'hesburgh_assets', :git => 'git@git.library.nd.edu:assets'
```

After the gem is installed, you'll need to do some manual work of copying in a layout file from the gem and tweaking it to make it work for your app.  Currently the best way to do that is referencing an existing application such as Factotum.

## Asset server

The asset server, located in `server/`, is based off of the 'dummy' server created with Rails engines.  It acts as both a content distibution server and style guide for all common library styles.

### Running locally

The asset server is configured to start automatically through guard.  From the project root:

    $ guard

To run the server manually:

    $ cd server; rails s

### Configuring Passenger

Since this is a nonstandard Rails application, the following tweaks were made to get it running under Passenger:

#### boot.rb

The paths in `server/config/boot.rb` assumed that the server was located two directories deep in `test/dummy/`.  The path `'../../../../Gemfile'` should be replaced with `'../../../Gemfile'` and `'../../../../lib'` with `'../../../lib'`

#### setup_load_paths.rb

Passenger looks for a `Gemfile` in the parent directory of `public/`.  For most Rails applications this works, but for this we need to add a file at `server/config/setup_load_paths.rb` to tell Passenger where to look.  I simply require `server/config/boot.rb` since it sets up the correct Gemfile location and include paths.  The contents of the file are:

```ruby
boot = File.expand_path('../boot.rb', __FILE__)
require boot
```

#### deploy symlinks
`server/log` should be the log directory that is symlinked to the shared log directory.

#### deploy restart
Restarting Passenger is done with `touch server/tmp/restart.txt`

#### deploy asset precompiling
By default, the dummy application rake tasks are namespaced under `app`, so `rake assets:precompile` would become `rake app:assets:precompile`.  Unfortunately that task attempts to call other rake tasks but is unaware of its new namespace.

To fix the issue, I copied the assets.rake file from the gem, renamed the assets namespace, and updated all rake calls to include the app namespace.  To precompile assets you must run `rake app:hesburgh_assets:precompile`
