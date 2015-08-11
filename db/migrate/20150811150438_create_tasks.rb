class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.boolean :complete, default: false
      t.text :note
      t.datetime :duedate
      t.datetime :startdate
      t.references :list, index: true, foreign_key: true
      t.string :attachment_file_name
      t.string :attachment_content_type
      t.integer :attachment_file_size
      t.datetime :attachment_updated_at

      t.timestamps null: false
    end
  end
end
