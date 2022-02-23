# frozen_string_literal: true

# Clean test db during Cypress use
module Test
  class DatabasesController < ApplicationController
    skip_before_action :verify_authenticity_token

    def reset_database
      tables = ActiveRecord::Base.connection.tables
      tables.delete 'schema.migrations'
      tables.each do |table|
        ActiveRecord::Base.connection.execute("DELETE FROM #{table}")
        ActiveRecord::Base.connection.execute("DELETE FROM sqlite_sequence where name='#{table}'")
      end

      head :ok
    end
  end
end
