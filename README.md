# Recipes (v1.6)

Static app: `index.html`, `styles.css`, `app.js`, and `vendor/supabase.js` (supabase-js 2.119.1, bundled so it loads without a CDN).

Upload all of these, keeping the `vendor` folder, to the root of the GitHub Pages repo.

- Works without signing in. Recipes then stay on that device only.
- Settings, Account and sync: sign in with Google to keep recipes, lists and the meal plan the same on every device.
- Database tables and access rules: see `schema.sql` (already run in Supabase).
