class CreateAppQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :app_questions do |t|
      t.string :question
      t.text :answer
    end
  end
end
