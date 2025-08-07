# Booking API

A simple property rental backend API (like Airbnb/Booking.com) built with Node.js, Express, Sequelize, and PostgreSQL.

## Features
- List properties
- View property availability
- Create/cancel bookings
- Date validation and overlap checks
- Unit/integration tests

## Setup Instructions
1. Clone this repo or unzip the folder.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure your PostgreSQL database in `.env` (see `.env.example`).
4. Run migrations and seed data:
   ```sh
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
5. Start the server:
   ```sh
   npm start
   ```

## Testing
Run all tests:
```sh
npm test
```

## API Endpoints
- `GET /properties` — List all properties
- `GET /properties/:id/availability` — Property availability
- `POST /bookings` — Create booking
- `DELETE /bookings/:id` — Cancel booking
- `PUT /bookings/:id` — Update booking (bonus)

## Notes
- Assumes all dates are in `YYYY-MM-DD` format.
- Bookings cannot overlap or be outside property availability.
- See code comments for more details.
