# Docker Instructions

## Running
To run the full stack of services, including mysql, solr, and rails, using docker-compose:
```sh
docker-compose build
docker-compose up
```
## Rebuilding Rails
You can rebuild and restart the running rails service without restarting dependencies with:
```sh
docker-compose up -d --force-recreate --no-deps --build rails
```

## Chrome Testing
Run the following to build and run the Chrome tests against the locally running services using Docker:
```sh
docker build -f docker/Dockerfile.chrome.tests -t architecture/tests/chrome .
docker run \
  --network="architecture_drawings_default" \
  --label architecture-tests-chrome architecture/tests/chrome
```

To test another host, use the default network and override the BaseURL, ex:
```sh
docker run \
  -e BaseURL='https://drawings.library.nd.edu' \
  --label architecture-tests-chrome architecture/tests/chrome
```
