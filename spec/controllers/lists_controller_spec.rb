require 'rails_helper'

RSpec.describe ListsController, type: :controller do
  
  before(:each) do
    @list = List.create!(title: "test")
    @task = Task.create!(title: "task", note: "new task", startdate: Time.now + 1.day, duedate: Time.now + 2.days, list_id: @list.id)
    @task2 = Task.create!(title: "a tasktwo", note: "new task", startdate: Time.now + 1.day, duedate: Time.now + 3.days, list_id: @list.id)
  end
    
  describe "GET#index" do
    it "gets all the lists and their active tasks" do
      get :index, format: :json
      data = JSON.parse(response.body, symbolize_names: true)

      expect(data.count).to eq(1)
      expect(data.first[:tasks].count).to eq(2)
    end
  end
  
  describe "POST#sorted" do
    it "gets all the lists and their active tasks sorted by title" do
      post :sorted, format: :json, sort_by: "title"
      data = JSON.parse(response.body, symbolize_names: true)
      
      expect(data.count).to eq(1)
      expect(data.first[:tasks].first[:title]).to eq("a tasktwo")
    end
    
    it "gets all the lists and their active tasks sorted by duedate" do
      post :sorted, format: :json, sort_by: "duedate"
      data = JSON.parse(response.body, symbolize_names: true)
      
      expect(data.count).to eq(1)
      expect(data.first[:tasks].first[:title]).to eq("task")
    end
    
    it "gets all the lists and their active tasks sorted by status" do
      post :sorted, format: :json, sort_by: "complete"
      data = JSON.parse(response.body, symbolize_names: true)
      
      expect(data.count).to eq(1)
      expect(data.first[:tasks].first[:title]).to eq("task")
    end
  end
end
