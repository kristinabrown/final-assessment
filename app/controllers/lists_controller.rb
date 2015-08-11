class ListsController < ApplicationController
  respond_to :json
  
  def index
    respond_with List.lists_payload, location: nil
  end
  
  def sorted
    respond_with List.lists_payload_sorted(params[:sort_by]), location: nil
  end
end
