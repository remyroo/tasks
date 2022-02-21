# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Tasks', type: :request do
  describe 'GET /index' do
    context 'when no tasks have been created' do
      before { get api_v1_tasks_path }

      it 'returns an empty response' do
        expect(json).to be_empty
      end

      it 'returns a 200 status code' do
        expect(response).to have_http_status(:success)
      end
    end

    context 'when tasks have been created' do
      before do
        2.times { Task.create(name: 'Some task') }
        get api_v1_tasks_path
      end

      it 'returns all the tasks' do
        expect(json.size).to eq(2)
      end

      it 'returns a 200 status code' do
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe 'POST /tasks' do
    let(:valid_params) { { task: { name: 'Some task' } } }
    let(:invalid_params) { { task: { name: '', description: 'Some text' } } }

    context 'with valid params' do
      before { post api_v1_tasks_path, params: valid_params }

      it 'creates a task' do
        expect(json['name']).to eq('Some task')
      end

      it 'returns a 201 status code' do
        expect(response).to have_http_status(:created)
      end
    end

    context 'with image' do
      it 'stores the image' do
        file = fixture_file_upload(Rails.root.join('spec/support/assets/test_img.jpeg'), 'image/jpeg')

        expect do
          post api_v1_tasks_path, params: { task: { name: 'New task', avatar: file } }
        end.to change(ActiveStorage::Attachment, :count).by(1)
      end
    end

    context 'with invalid params' do
      before { post api_v1_tasks_path, params: invalid_params }

      it 'returns an error message' do
        expect(json['name']).to eq(["can't be blank"])
      end

      it 'returns a 422 status code' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PUT /task/:id' do
    let(:task) { Task.create(name: 'A task') }
    let(:valid_params) { { task: { completed_at: '10:30' } } }
    let(:invalid_params) { { task: { name: '' } } }

    context 'with valid params' do
      before { put api_v1_task_path(task), params: valid_params }

      it 'updates the task' do
        expect(json['completed_at']).to match('10:30 AM')
      end

      it 'returns a 200 status code' do
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid params' do
      before { put api_v1_task_path(task), params: invalid_params }

      it 'returns an error message' do
        expect((json['name'])).to eq(["can't be blank"])
      end

      it 'returns a 422 status code' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE /task/:id' do
    context 'when the task exists' do
      let(:task) { Task.create(name: 'A task') }
      before { delete api_v1_task_path(task) }

      it 'deletes the task' do
        result = Task.count
        expect(result).to be_zero
      end

      it 'returns a no content response' do
        expect(response).to have_http_status(:no_content)
      end
    end
  end
end
