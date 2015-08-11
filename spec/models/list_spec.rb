require 'rails_helper'

RSpec.describe List, type: :model do
  before(:each) do  
    @list = List.create!(title: "newlist")
  end
  
  it "is valid with valid attributes" do
    expect(@list).to be_valid
  end
  
  it "is invalid without title" do
    @list.update(title: nil)
    expect(@list).to_not be_valid
  end
  
  it "is invalid with title as empty string" do
    @list.update(title: "")
    expect(@list).to_not be_valid
  end
end
