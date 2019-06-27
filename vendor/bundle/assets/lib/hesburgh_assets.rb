require "hesburgh_assets/engine"

module HesburghAssets

  def self.assets_host
    hosts["assets"]
  end

  def self.library_host
    hosts["library"]
  end

  private
    def self.root
      @root ||= File.expand_path(File.dirname(File.dirname(__FILE__)))
    end

    def self.load_yml(file)
      YAML.load_file(File.join(self.root, "config", file))
    end

    def self.hosts
      @hosts ||= self.load_yml('hosts.yml')
      @hosts[Rails.env] || @hosts['default']
    end
end
