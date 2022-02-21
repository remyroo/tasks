# frozen_string_literal: true

5.times { Task.create(name: Faker::Hipster.paragraph_by_chars(characters: 40)) }

Task.all.sample(4).each { |task| task.update!(description: Faker::Hipster.paragraph_by_chars(characters: 100)) }

Task.all.sample(2).each { |task| task.update!(completed_at: Faker::Time.backward(days: 3)) }

Task.last.avatar.attach(io: File.open(Rails.root.join('spec/support/assets/test_img.jpeg')),
                        filename: 'test_img.jpeg')
