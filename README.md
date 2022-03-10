# README

## DoubleGDP Coding Challenge

This is a Tasks app built with:
- Rails 6, SQLite3 and RSpec on the backend,
- React, MUI (Material-UI v5) and Cypress on the frontend,
- Webpack via jsbundling-rails.


## Installation

Clone the repo from Github:
```
git clone git@github.com:remyroo/tasks.git
cd tasks
```

Install the gems and javascript dependencies:
```
bundle install
yarn install
```

Run a database migration:
```
rails db:migrate
```

## Testing

### Rails unit tests
```
rspec spec
```

To view the coverage report
```
open coverage/index.html
```

### Integration tests
In two separate terminals, start the rails and cypress servers.

Terminal 1:
```
RAILS_ENV=test rails server
```
Terminal 2:
```
yarn test

// or to run all tests headlessly
yarn test:all
```

To view the coverage report
```
open coverage/lcov-report/index.html
```

## Launch

In separate terminals, start the rails and yarn servers.

Terminal 1:
```
rails server
```
Terminal 2:
```
yarn dev
```

## Usage

### Task List page

- When no tasks present
![TaskList](https://user-images.githubusercontent.com/20615801/158220272-4764a5fc-3052-480f-9b66-7d0811718e5d.png)

- View list of tasks and stats when present
![TaskList-populated](https://user-images.githubusercontent.com/20615801/158221740-8b636bb0-ebbd-4cc9-be6a-a33f8ec6a4b1.png)

- Dark mode
![Dark mode](https://user-images.githubusercontent.com/20615801/158221845-bda5cac0-8371-48ec-a73f-9e2665259c21.png)

### Add Tasks page

- Add a new task
![TaskForm](https://user-images.githubusercontent.com/20615801/158221967-37ace8d3-e2a6-4f11-a3ef-94018d749014.png)

- Dark mode
![Dark mode form](https://user-images.githubusercontent.com/20615801/158222062-d47b5017-895e-4b42-8815-b74b23115649.png)

## Addendum
There are a few features I was not able to implement, as listed in the Icebox card of
my [Trello](https://trello.com/c/RuJGoPzi/4-sprinkles) board for this project.
