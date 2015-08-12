class Task < ActiveRecord::Base
  belongs_to :list
  validates :title, presence: true
  validate :check_duedate
  validate :check_startdate
  has_attached_file :attachment, default_url: "alpaca.jpg",
                                 storage: :s3,
                                 bucket: ENV['S3_BUCKET_NAME'],
                                 s3_credentials: { access_key_id: ENV['AWS_ACCESS_KEY_ID'],
                                                   secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'] }
                                                   
   
   def check_duedate
     errors.add(:base, "due date needs to be later than today") if self.duedate < Time.now
   end
   
   def check_startdate
     errors.add(:base, "start date needs to be later than today") if self.startdate < Time.now
   end
   
   def change_status
     update(complete: !complete)
   end
end
