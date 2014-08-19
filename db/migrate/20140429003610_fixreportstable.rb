class Fixreportstable < ActiveRecord::Migration
  def change
    rename_column :reports, :report_type, :report_type_id
  end
end
