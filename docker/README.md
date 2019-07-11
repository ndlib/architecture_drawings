# Docker Instructions

## Running
### Development
To run the full stack of services, including mysql, solr, and rails, using docker-compose:
```sh
docker-compose up
```
### Production
Production will additionally run an nginx container to serve out static assets. To run it in this mode locally, do the following:
```sh
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
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
