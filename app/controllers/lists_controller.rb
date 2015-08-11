class ListsController < ApplicationController
  respond_to :json, :html
  
  def index
    respond_with List.all, location: nil
  end
  
  def create
    respond_with List.create(list_params), location: nil
  end
  
  def sorted
    respond_with List.lists_payload_sorted(params[:sort_by]), location: nil
  end
  
  def destroy
    respond_with List.find(params[:id]).destroy, location: nil
  end
  
  private
  
  def list_params
    params.permit(:title, :description)
  end
end
