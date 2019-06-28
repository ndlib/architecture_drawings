# All the things that will execute when starting the rails service

# Copy the generated lock file back into the project root. This is to sync the lock
# file back to the host after the container has mounted the sync volume
cp /bundle/Gemfile.lock ./Gemfile.lock

bash docker/wait-for-it.sh mysql:3306
bash docker/wait-for-it.sh solr:8983

export RAILS_ENV=development
bundle exec rake db:schema:load
bundle exec rake import:test
exec bundle exec rails s -b 0.0.0.0
