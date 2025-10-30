# Kaze Commercial Corp. (React + Tailwind + Node/Express)

A basic full-stack storefront to sell powerbanks. Frontend is Vite + React + Tailwind;
backend is Node/Express serving a demo products API and a fake checkout.

## Quick Start

### 1) Install & run the server
```bash
cd server
cp .env.example .env        # optional
npm install
npm run dev                 # starts http://localhost:5000
```

### 2) Install & run the client (in a new terminal)
```bash
cd client
npm install
npm run dev                 # starts http://localhost:5173
```

- During development, the client proxies `/api` to `http://localhost:5000` (see `vite.config.js`).
- Open http://localhost:5173 to view the site.

## Build for Production

1. Build frontend:
```bash
cd client
npm run build
```

2. Serve built UI from the server:
```bash
cd ../server
npm run start
# Visit http://localhost:5174
```

## Where to Customize

- **Products**: Edit the products array in `server/server.js`.
- **Branding**: Update colors in `client/tailwind.config.js` and text in React components.
- **Images**: Replace PNGs in `client/public` with your product photos (keep same file names or update the `img` fields in products).

## Payment Integration (Next Step)
This demo uses a fake `/api/checkout`. To accept payments, integrate Stripe or PayPal:
- Create a payment intent or order server-side
- Confirm the payment client-side
- Fulfill orders in your database and email receipts

## Notes
- This project is intentionally simple and framework-agnostic beyond Vite + Tailwind.
- Feel free to add routing, auth, or a real database as needed.
