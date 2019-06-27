# Goals

## Asset Server

* Content distribution for common stylesheets, javascripts, and images.
* Acts as a style guide for all templates.
* Configured for optimal caching and compression to improve page load times.

## Rails Gem

* Generator creates layout file(s) that can be modified as needed for the application
* Helper methods to support the dynamic portions of the template (i.e. breadcrumb)
* Asset files packaged inside the gem for test/development environments to reduce network traffic
* production/pre_production environments link to the asset server for css, js, and images

# TODO

* Configure Apache caching/compression for files served through the asset server
* Linking to asset server in prod/pprd environments
* Create generator for layouts and helper methods
