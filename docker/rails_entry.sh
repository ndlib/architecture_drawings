# All the things that will execute when starting the rails service
# Copy the generated lock file back into the project root. This is to sync this change back to the
# application after the container has mounted the sync volume
cp /bundle/Gemfile.lock ./

# Have to do this here to allow using localhost when deployed with ECS awsvpc
# Could not see a way to have this solr.yml read env
sed -i "s;\${SOLR_URL};$SOLR_URL;g" /project_root/config/solr.yml

bash docker/wait-for-it.sh -t 120 ${DB_HOST}:3306
bash docker/wait-for-it.sh -t 120 ${SOLR_HOST}:8983

bundle exec rake db:schema:load
bundle exec rake import:prod
exec bundle exec rails s
