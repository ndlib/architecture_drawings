class AssetFixer
  URL_REGEX = /url\(['"]?([^'")]+)['"]?\)/
  FOUNDATION_REGEX = /^\.\.\/images/

  attr_accessor :version, :filename, :failed_downloads

  def initialize(version, filename)
    self.version = version
    self.filename = filename
    self.failed_downloads = []
  end

  def fix_assets
    file_path = File.join(stylesheets_directory, filename)
    replacements = []
    css_contents = File.read(file_path)
    matches = css_contents.scan(URL_REGEX)
    replaced_contents = css_contents.clone
    matches.each do |paths|
      path = paths[0]
      download_url = get_download_url(path)
      file_name = File.basename(path)
      if download_url.present?
        if download_file(download_url)
          replaced_contents.gsub!(path,"/assets/#{version}/#{file_name}")
        else
          failed_downloads << download_url
        end
      end
    end
    File.open(file_path, "w") do |file|
      file.write(replaced_contents)
    end
  end

  def self.fix_assets(version, filename = nil)
    require 'open-uri'
    failed_downloads = []
    if filename
      css_files = [filename]
    else
      css_files = Dir.entries(stylesheets_directory(version)).reject{|f| !(f =~ /.css$/)}
    end

    css_files.each do |name|
      fixer = self.new(version, name)
      fixer.fix_assets
    end

    failed_downloads
  end

  def images_directory
    self.class.images_directory(version)
  end

  def stylesheets_directory
    self.class.stylesheets_directory(version)
  end

  def self.images_directory(version)
    File.join(Rails.root,"app","assets","images",version)
  end

  def self.stylesheets_directory(version)
    File.join(Rails.root,"app","assets","stylesheets",version)
  end

  def get_download_url(path)
    if path =~ /^\/assets/
      # skip anything already in /assets
    elsif path =~ /^\//
      "https://www.library.nd.edu#{path}"
    elsif filename == "superfish.css" && path =~ /^images/
      new_path = path.gsub(/^images/,"/css/images")
      get_download_url(new_path)
    elsif filename == "foundation.css" && path =~ FOUNDATION_REGEX
      new_path = path.gsub(FOUNDATION_REGEX,"/styleguide/images")
      get_download_url(new_path)
    else
      puts "Unknown path: #{path}"
    end
  end

  def download_file(download_url)
    begin
      downloaded_file = open(download_url, "User-Agent" => "Ruby/#{RUBY_VERSION}")
      file_name = File.basename(download_url).gsub(/[?].*$/,"").gsub(/#.*$/,"")
      contents = downloaded_file.read
      File.open(File.join(images_directory, file_name), "wb") do |copied_file|
        copied_file.write(contents)
      end
      true
    rescue OpenURI::HTTPError => e
      puts "Failed to download #{download_url} - #{e.message}"
      false
    end
  end
end
