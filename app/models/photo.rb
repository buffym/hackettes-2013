class Photo < ActiveRecord::Base
  # attr_accessible :title, :body

  def child
    @child = nil
    if self.sequence == 0
      @child = Photo.where(ls_id: self.ls_id).where('sequence != 0').order('sequence asc').first
    end
    @child
  end
end
