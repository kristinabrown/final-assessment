class TasksController < ApplicationController
  respond_to :json
  
  def create
    task = Task.create(task_params)
    respond_with task, location: nil
  end
  
  def destroy
    task = Task.find(params[:id])
    task.delete
    respond_with task, location: nil
  end
  
  def status_change
    task = Task.find(params[:id])
    task.change_status
    respond_with task, location: nil
  end
  
  def list_tasks
    respond_with Task.where(list_id: params[:list]), location: nil
  end
  
  def edit
    @task = Task.find(params[:id])
  end
  
  def update
    @task = Task.find(params[:id])
    @task.update(task_params_update)
    redirect_to lists_path
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
  
  def task_params_update
    params.require(:task).permit(:title, 
                                :complete, 
                                :note, 
                                :duedate, 
                                :startdate, 
                                :list_id,
                                :attachment)
  end
end
