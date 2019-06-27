module AssetsHelper
  include HesburghAssets::AssetsHelper

  def preheader_content
    render partial: 'layouts/asset_server_navigation'
  end
end
