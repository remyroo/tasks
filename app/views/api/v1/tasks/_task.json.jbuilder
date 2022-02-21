# frozen_string_literal: true

json.extract! task, :id, :name, :description, :completed_at
json.avatar_url rails_blob_url(task.avatar) if task.avatar.attached?
