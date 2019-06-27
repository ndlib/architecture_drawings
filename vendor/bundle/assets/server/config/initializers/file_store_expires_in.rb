# Add an :expires_in option to FileStore caching.
module ActiveSupport
  module Cache
    class FileStore < Store
      alias :original_read_entry :read_entry

      protected

      def read_entry(key, options = {})
        file_name = key_file_path(key)
        if options[:expires_in].present? && File.exists?(file_name) && (File.mtime(file_name) + options[:expires_in]) <= Time.now
          nil
        else
          original_read_entry(key, options)
        end
      end
    end
  end
end
