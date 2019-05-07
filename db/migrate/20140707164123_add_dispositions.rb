class AddDispositions < ActiveRecord::Migration[5.0]
  def change
    create_table :dispositions do |t|
      t.string :name
      
    end
    execute "insert into dispositions (name) values ('Budget'), ('Apps not beneficial'), ('Tablet Quality'), ('Broken Tablet'), ('On Hold'), ('Wrong Address'), ('Accidental Purchase'), ('Defective Apps'), ('Not Satisfied'), ('Didn''t want it'), ('Delayed shipping'), ('International')"
  end
end
