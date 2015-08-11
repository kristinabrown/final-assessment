class TasksController < ApplicationController
  respond_to :json
  
  def create
    respond_with Task.create(task_params), location: nil
  end
  
  def destroy
    respond_with Task.find(params[:id]).delete, location: nil
  end
  
  def status_change
    task = Task.find(params[:id])
    respond_with task.update(complete: params[:complete]), location: nil
  end
  
  def list_tasks
    respond_with Task.where(list_id: params[:list]), location: nil
  end
  
  private
  
  def task_params
    params.permit(:title, 
                  :complete, 
                  :note, 
                  :duedate, 
                  :startdate, 
                  :list_id,
                  :attachment)
  end
end
