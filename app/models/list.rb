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
  
  def order_tasks_by_filter(filter)
    if filter == "incomplete"
      tasks.where(complete: false)
    elsif filter == "complete"
      tasks.where(complete: true)
    elsif filter == "duedate"
      tasks.order(:duedate)
    elsif filter == "startdate"
      tasks.order(:startdate)
    elsif filter == "title"
      tasks.order(:title)
    end
  end
end
