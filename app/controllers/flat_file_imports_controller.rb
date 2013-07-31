class FlatFileImportsController < ApplicationController
  def show
    if session[:last_import_id]
      @import = FlatFileImport.find_by_id(session[:last_import_id])
    end
    if @import.nil?
      redirect_to new_flat_file_import_path
    end
  end

  def new
    @import = FlatFileImport.new
  end

  def create
    @import = FlatFileImport.new(params[:flat_file_import])
    if @import.save
      session[:last_import_id] = @import.id
      @import.process_import_file!
      redirect_to flat_file_import_path
    else
      render action: :new
    end
  end
end
