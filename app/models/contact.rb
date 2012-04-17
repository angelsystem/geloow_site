class Contact < ActiveRecord::Base
	validates_presence_of :mail, :name
end
