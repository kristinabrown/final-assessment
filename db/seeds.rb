class Seed
  def self.go
    Rails.env == "production" ? production : development
  end

  def self.production
    generate_lists
    generate_tasks
  end

  def self.development
    generate_lists
    generate_tasks
  end
  
  def self.generate_lists
    List.create!(title: "first list", description: "this is the first list")
    List.create!(title: "second list", description: "this is the second list")
  end
  
  def self.generate_tasks
    List.all.each do |list|
      5.times do
        Task.create!(title: Faker::Lorem.word, startdate: Time.now + 1, duedate: Time.now + 2, note: Faker::Lorem.sentence, list_id: list.id)
      end
    end
  end
end

Seed.go

