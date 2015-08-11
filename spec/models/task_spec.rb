require 'rails_helper'

RSpec.describe Task, type: :model do
  before(:each) do
    list = List.create!(title: "test")
    @task = Task.create!(title: "task", note: "new task", startdate: Time.now + 1.day, duedate: Time.now + 2.days, list_id: list.id)  
  end
  
  it "is valid with valid attributes" do
    expect(@task).to be_valid
  end
  
  it "is invalid without title" do
    @task.update(title: nil)
    expect(@task).to_not be_valid
  end
  
  it "is invalid with title as empty string" do
    @task.update(title: "")
    expect(@task).to_not be_valid
  end
  
  it "is invalid with a due date before today" do
    @task.update(duedate: Time.now - 1.day)
    expect(@task).to_not be_valid
    expect(@task.errors.full_messages.join).to eq("due date needs to be later than today")
  end
  
  it "is invalid with a start date before today" do
    @task.update(startdate: Time.now - 1.day)
    expect(@task).to_not be_valid
    expect(@task.errors.full_messages.join).to eq("start date needs to be later than today")
  end
end
