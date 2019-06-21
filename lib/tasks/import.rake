namespace :import do
  desc "Import test spreadsheet"
  task :test => :environment do
    params = Hash[import_file: File.open("spec/fixtures/test-export.xlsx",'r')]
    @import = FlatFileImport.new(params)
    if @import.save
      @import.process_import_file!
      puts "File 'spec/fixtures/test-export.xlsx' imported successfully."
    else
      puts "Failed to import file 'spec/fixtures/test-export.xlsx'."
    end
  end
end
