# Pune Pravas / MobilityOS

Firebase-backed mobility dashboard with secure user authentication, an admin-only area, and server-managed API keys.

## Run locally

1. Create a Firebase project in the `asia-south1` region and enable **Email/Password** and **Google** providers in Authentication.
2. Copy `.env.example` to `.env.local`, then replace every `VITE_FIREBASE_*` value with your Firebase Web App configuration. Do not commit `.env.local`.
3. Install and start the frontend:

   ```powershell
   npm install
   npm run dev
   ```

4. Configure the one permitted first administrator, then deploy rules and functions:

   ```powershell
   firebase functions:secrets:set ADMIN_BOOTSTRAP_EMAIL
   firebase deploy --only firestore:rules,firestore:indexes,functions
   ```

   Enter the email address of the account that will become the first admin. On its next sign-in the app securely provisions the admin custom claim and refreshes its token. Admin access cannot be assigned from Firestore or to another email from the browser.

5. Set `VITE_API_BASE_URL` to the deployed `api` function URL, rebuild, and deploy hosting:

   ```powershell
   npm run build
   firebase deploy --only hosting
   ```

## API

All endpoints except health require a Firebase ID token:

```text
Authorization: Bearer <Firebase ID token>
```

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/health` | Public | Health check |
| GET | `/me` | User | User profile and claims |
| GET | `/admin/dashboard` | Admin | Live user/key counts |
| GET | `/admin/api-keys` | Admin | List key metadata (never secrets) |
| POST | `/admin/api-keys` | Admin | Create a new secret API key |
| DELETE | `/admin/api-keys/:id` | Admin | Revoke a key |

Generated key values are returned only once. The backend saves a SHA-256 hash and prefix, never the raw secret.

## Security notes

- Firebase config values in `VITE_*` are public project identifiers, not server secrets.
- Keep provider API keys and production secrets in Firebase Secret Manager, not in `.env.local` or frontend code.
- The Firestore rules deny all access by default; API key records are administrator-only.
