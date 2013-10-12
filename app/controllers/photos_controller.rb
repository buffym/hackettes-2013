class PhotosController < ApplicationController

  def index

    conditions = []

    unless params[:year].blank?
      conditions << { year: params[:year]}
    end

    unless params[:town].blank?
      conditions << { town: params[:town] }
    end

    unless params[:county].blank?
      conditions << { county: params[:county] }
    end

    unless params[:has_location].blank?
      conditions << 'latitude IS NOT NULL AND longitude IS NOT NULL' if params[:has_location] == 'true'
    end

    if params[:sort_field]
      sort = params[:sort_field]
    else
      sort = 'year'
    end

    if params[:sort_order]
      order = params[:sort_order]
    else
      order = 'asc'
    end

    @photos = Photo.where(sequence: '000')

    if conditions.length > 0
      conditions.each do |condition|
        @photos = @photos.where(condition)
      end
    end

    @photos = @photos.order(sort + ' ' + order)

    render json: @photos
  end

  def show
    @photo = Photo.find(params[:id])

    respond_to do |format|
      format.js
      format.json { render json: @photo }
      format.html { render }
    end
  end

  def upload

  end

  def thanks

  end

  def search
    @location = 'Winooski'
  end


end
