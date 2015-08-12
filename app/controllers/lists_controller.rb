class ListsController < ApplicationController
  respond_to :json, :html
  
  def index
    respond_with List.all, location: nil
  end
  
  def create
    $redis.publish('update', 'blah')
    respond_with List.create(list_params), location: nil
  end
  
  def sorted
    respond_with List.find(params[:id]).order_tasks_by_filter(params[:sort_by]), location: nil
  end
  
  def destroy
    $redis.publish('update', 'blah')
    list = List.find(params[:id])
    list.tasks.destroy_all
    respond_with list.destroy, location: nil
  end
  
  private
  
  def list_params
    params.permit(:title, :description)
  end
end
