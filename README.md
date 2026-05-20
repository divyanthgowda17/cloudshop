# CloudShop – Frontend (React)

Cloud Computing Mini Project | Christ University MCA

---

## Quick Start

```bash
cd cloudshop
npm install
npm start
```
App runs at http://localhost:3000

---

## Project Structure

```
src/
├── context/
│   ├── CartContext.js      ← Global cart state (localStorage)
│   └── AuthContext.js      ← Global auth state (JWT token)
├── services/
│   └── api.js              ← All API calls (axios) — edit base URL here
├── components/
│   ├── Navbar.js
│   └── ProductCard.js
└── pages/
    ├── Home.js             ← Landing page with cloud feature badges
    ├── Products.js         ← Product listing with search + category filter
    ├── ProductDetail.js    ← Single product + CDN image note
    ├── Cart.js             ← Cart with quantity controls
    ├── Checkout.js         ← Order form → calls placeOrder API
    ├── Login.js            ← Login + Register (JWT)
    ├── OrderSuccess.js     ← Confirmation page
    └── Admin.js            ← Upload product image to S3 (admin only)
```

---

## Cloud Concepts Covered (Frontend Side)

| Concept | Where |
|---|---|
| AWS S3 image hosting | ProductCard, ProductDetail, Admin upload |
| CloudFront CDN | Image URLs via REACT_APP_CDN_URL |
| EC2/cloud API calls | All axios calls in services/api.js |
| JWT Auth | AuthContext stores token, sent in every API header |
| localStorage caching | Cart persists across page refreshes |
| Environment variables | .env file switches between local/deployed backend |

---

## Connecting to Your Backend (tell your teammate)

Edit `.env`:
```
REACT_APP_API_URL=http://<EC2-IP>:5000/api
REACT_APP_S3_BASE_URL=https://<bucket>.s3.amazonaws.com
REACT_APP_CDN_URL=https://<cloudfront-id>.cloudfront.net
```

### APIs your backend needs to expose:

| Method | Endpoint | What it does |
|---|---|---|
| GET | /api/products | Get all products (optional ?category=) |
| GET | /api/products/:id | Single product |
| POST | /api/auth/register | Register user → return {user, token} |
| POST | /api/auth/login | Login → return {user, token} |
| POST | /api/orders | Place order (auth required) |
| POST | /api/upload | Upload image to S3 → return {imageUrl} |

---

## Deploy Frontend (Netlify / Vercel — free)

```bash
npm run build
# Upload the /build folder to Netlify
# OR: connect GitHub repo to Vercel
```

Set environment variables in the hosting dashboard.
