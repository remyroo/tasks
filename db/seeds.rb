# frozen_string_literal: true

10.times { Task.create(name: Faker::Hipster.paragraph_by_chars(characters: 40)) }

Task.all.sample(8).each { |task| task.update!(description: Faker::Hipster.paragraph_by_chars(characters: 100)) }

Task.all.sample(5).each { |task| task.update!(completed_at: Faker::Time.backward(days: 3)) }
