class Notifier < ApplicationMailer
  
  def new_task(email, task)
    @task = task
    
    mail(to: email, subject: "You were included on a new task: #{@task.title}")
  end
  
  def update_task(email, task)
    @task = task
    
    mail(to: email, subject: "A task you were included on was updated: #{@task.title}")
  end
end
