class RemoveAppQuestions < ActiveRecord::Migration[5.0]
  def change
    drop_table :app_questions
  end
end
