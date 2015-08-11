class List < ActiveRecord::Base
  has_many :tasks
  validates :title, presence: true
  
  def self.lists_payload
    all.map do |list|
      {list: list, tasks: list.tasks.where(complete: false)}
    end
  end
 
  def self.lists_payload_sorted(sort_by)
    all.map do |list|
      {list: list, tasks: list.tasks.where(complete: false).order(sort_by)}
    end
  end
end
