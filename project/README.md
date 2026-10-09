# Mobil Moyka 🚗💧

**Navbat kutmang — moykachi o'zi oldingizga boradi.**

Professional mobile car wash booking app. Customers order a car wash online, and the washer comes to their location — no waiting in line at the car wash.

## Features

- **Online ordering**: Customer picks car model, enters address, submits order
- **Admin panel**: View and manage all orders, change statuses, delete orders
- **Click-to-call**: Real `tel:` links throughout the site — `+998 33 364 99 19`
- **Multi-language**: Uzbek (default), Russian, English — all UI text switches instantly
- **Dark/Light theme**: Toggle with persistence via localStorage
- **Responsive**: Works on mobile, tablet, and desktop with hamburger menu
- **Animations**: Fade-in, slide-up, hover effects, smooth scroll, modal animations
- **Database**: Orders saved to Supabase (PostgreSQL) with Row Level Security

## Tech Stack

### Frontend
- React 18 + Vite
- JavaScript (no TypeScript)
- CSS (custom design system, no framework)
- @supabase/supabase-js

### Backend (standalone, in `/server`)
- Node.js + Express.js
- MongoDB + Mongoose
- dotenv, CORS

### Database (live demo)
- Supabase (PostgreSQL) — orders table with RLS enabled

## Project Structure

```
/client (root)
  /src
    /components     — Navbar, Hero, ProblemSolution, Pricing, HowItWorks, Advantages, CTA, Footer, OrderForm, OrderModal, AdminPanel
    /context        — AppContext (language + theme)
    /hooks          — useReveal (scroll animations)
    /services       — translations.js, api.js
    App.jsx
    main.jsx
    index.css       — Design system (variables, themes, utilities)
    App.css         — Component styles

/server
  /models           — Order.js (Mongoose schema)
  /routes           — orderRoutes.js
  /controllers      — orderController.js
  /middleware       — errorHandler.js
  server.js
  .env
```

## Setup & Run

### Frontend (live demo with Supabase)

```bash
npm install
npm run dev
```

The frontend uses Supabase directly for data persistence. The Supabase connection is pre-configured — no setup needed.

### Backend (standalone Express + MongoDB)

```bash
cd server
npm install
npm run dev
```

Before running the backend:

1. Create a MongoDB database (local or MongoDB Atlas)
2. Edit `server/.env`:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
3. Start the server: `npm run dev`

The API runs on `http://localhost:5000`.

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/orders` | Create a new order |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get a single order |
| PATCH | `/api/orders/:id` | Update order status |
| DELETE | `/api/orders/:id` | Delete an order |

### Order Schema

```json
{
  "name": "string",
  "phone": "string",
  "carModel": "Cobalt | Malibu | Onix | BYD | KIA",
  "price": "number",
  "address": "string",
  "comment": "string",
  "preferredTime": "string",
  "status": "new | accepted | in_progress | completed | cancelled",
  "createdAt": "timestamp"
}
```

## Pricing

| Model | Price (so'm) |
|-------|-------------|
| Cobalt | 100,000 |
| Malibu | 110,000 |
| Onix | 250,000 |
| BYD | 239,999 |
| KIA | 234,500 |

## Admin Panel

Visit `/admin` to:
- View all incoming orders
- Change order status (new → accepted → in_progress → completed / cancelled)
- Click phone numbers to call customers directly
- Delete orders

## Demo Flow

1. Open the site — Hero section loads with animations
2. Toggle dark/light mode (navbar)
3. Switch language (UZ/RU/EN) — all text changes
4. Browse pricing cards
5. Click "Buyurtma berish" on Cobalt — order form opens with model pre-selected
6. Fill the form and submit
7. Order saves to database
8. Success modal appears with click-to-call button
9. Click phone number — real phone call initiated
10. Visit `/admin` — see the order in the table
11. Change order status from the dropdown

## Contact

📞 +998 33 364 99 19

© 2026 Mobil Moyka. Barcha huquqlar himoyalangan.
