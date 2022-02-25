# frozen_string_literal: true

json.extract! task, :id, :name, :description
json.completed_at task.completed_at.strftime('%I:%M %p') if task.completed_at
json.avatar_url rails_blob_url(task.avatar) if task.avatar.attached?
