require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  
  before(:each) do
    @list = List.create!(title: "test")
  end
    
  describe "POST#create" do
    it "creates a new task" do
      post :create, format: :json, list_id: @list.id, title: "new", startdate: Time.now + 1.day, duedate: Time.now + 2.days

      expect(response.status).to eq(201)
    end
  end
  
  describe "DELETE#destroy" do
    it "deletes a task" do
      task = Task.create!(list_id: @list.id, title: "tobedeleted", startdate: Time.now + 1.day, duedate: Time.now + 2.days)
      expect(Task.count).to eq(1)
      delete :destroy, format: :json, id: task.id

      expect(Task.count).to eq(0)
    end
  end
  
  describe "PUT#status_change" do
    it "changes a status" do
      task = Task.create!(list_id: @list.id, title: "tobedeleted", startdate: Time.now + 1.day, duedate: Time.now + 2.days)
      expect(Task.first.complete).to eq(false)
      put :status_change, format: :json, id: task.id, complete: true

      expect(Task.first.complete).to eq(true)
    end
  end
end
