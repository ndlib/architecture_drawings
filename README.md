# Architecture Drawings

Search tool for the Architecture Library's collection of maps

https://drawings.library.nd.edu/
https://drawingspprd.library.nd.edu/

## Installation

```sh
bundle install
cp config/database.yml.example config/database.yml
bundle exec rake db:create
bundle exec rake db:migrate
bundle exec rake db:migrate RAILS_ENV=test
```
### Notes

If you encounter errors with libv8 and therubyracer:
```
gem install libv8 -v '3.16.14.3' -- --with-system-v8
bundle config build.libv8 --with-system-v8
bundle config build.therubyracer --with-system-v8
gem install therubyracer
bundle install
```

## Running
```sh
bundle exec guard
```

## Adding test data

1. Open http://localhost:3010/import
2. Import the file from spec/fixtures/test-export.xlsx

Alternatively, run a rake task to do this for you:
`bundle exec rake import:test`

## Searching

Searching can be done from http://localhost:3010/

## Deploy

Deployed via Jenkins: https://jenkins-vm.library.nd.edu/jenkins/job/Architecture%20Drawings/
