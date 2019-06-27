class CatalogController < ApplicationController
  layout 'hesburgh_assets/catalog/1.0'

  def index
    params[:q] ||= 'stoppard'
  end
end
