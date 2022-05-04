This is a frontend using Next.js/React.

The purpose is to interact with a backend sending and receiving data via various POST/GET requests.  The backend I have yet to publish is written in Go hence the name. In this app we are authenticating against Google OAuth and requesting various Google Tag Manager permissions to update and publish data on behalf of our authenticated user.

In order to run this you should have something listening to the various routes indicated in the "pages" folder

This requires GCP OAuth credentials and expects an .env file at the root containing
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET