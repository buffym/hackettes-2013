class PhotosController < ApplicationController

  def index

    conditions = []

    unless params[:year].blank?
      years = params[:year].split('-', 2)
      if years.length > 1
        conditions << "year >= #{Photo.sanitize(years[0])}"
        conditions << "year <= #{Photo.sanitize(years[1])}"
      else
        conditions << { year: params[:year]}
      end
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

    if params[:page]
      @photos = @photos.page(params[:page]).per(100)
    end

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

  def town_counts
    @town_counts = TownCount.where(town: params[:name])
    render json: @town_counts
  end


end
