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

## Running
```sh
bundle exec guard
```

## Adding test data

1. Open http://localhost:3010/import
2. Import the file from spec/fixtures/test-export.xlsx

## Searching

Searching can be done from http://localhost:3010/

## Deploy

Deployed via Jenkins: https://jenkins-vm.library.nd.edu/jenkins/job/Architecture%20Drawings/
