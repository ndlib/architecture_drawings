namespace :import do
  desc "Import test spreadsheet"
  task :dev => :environment do
    params = Hash[import_file: File.open("spec/fixtures/test-export.xlsx",'r')]
    @import = FlatFileImport.new(params)
    if @import.save
      @import.process_import_file!
      puts "File 'spec/fixtures/test-export.xlsx' imported successfully."
    else
      puts "Failed to import file 'spec/fixtures/test-export.xlsx'."
    end
  end

  desc "Import production spreadsheets"
  task :prod => :environment do
    ["vendor/data/drawings1.xlsx", "vendor/data/drawings2.xlsx"].each do |filename|
      import_file = File.open(filename,'r')
      params = Hash[import_file: import_file]
      @import = FlatFileImport.new(params)
      if @import.save
        @import.process_import_file!
        puts "File '#{filename}' imported successfully."
      else
        puts "Failed to import file '#{filename}'."
      end
      import_file.close
    end
  end
end
