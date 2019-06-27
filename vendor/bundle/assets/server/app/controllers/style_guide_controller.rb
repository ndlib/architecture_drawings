class StyleGuideController < ApplicationController
  def index
  end

  def one_column
  end

  def two_column_left
  end

  def two_column_right
  end

  def homepage
  end

  def branch
    params[:active_branch_code] = "engineering_library"
  end

  def search_appliance
  end
end
