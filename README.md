# Recipe app (v1 preview, sample data)

Plain HTML, CSS and JavaScript. No build step.

## Put it on GitHub Pages
1. Create a new public GitHub repo named `Recipes`.
2. Upload `index.html`, `styles.css`, and `app.js` to the top level of the repo.
3. In the repo, go to Settings, then Pages. Set the source to the main branch, root folder.
4. After a minute, the app is at https://risto74.github.io/Recipes/

## What works now
- Recipe library with search and tag filters
- Recipe page with a servings scaler
- Cooking mode: one step at a time, timers, servings scaler
- Weekly plan: add and remove dinners, week navigation
- Import by pasting text, with a review screen before saving

## What is not built yet
- Google sign-in and the cloud database. Recipes are saved in this device's browser storage only.
- Web link import, USDA nutrition, and estimates.

## Notes
- Data is stored on one device under the key `recipeapp.v1`. Clearing the app's data erases it.
- Samples can be removed with the "Remove samples" button in the library.
