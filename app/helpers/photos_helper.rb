module PhotosHelper

  def random_previews
    @random_previews ||= Photo.where(:town => @location).where(:sequence => 0).limit(8)
  end
end
