# frozen_string_literal: true

class Task < ApplicationRecord
  scope :desc_order, -> { order(created_at: :desc) }

  has_one_attached :avatar

  validates :name, presence: true, length: { maximum: 50 }
  validates :description, length: { maximum: 100 }
end
