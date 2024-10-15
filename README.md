This project is for a web app built to solve a problem of a single person (me): I take many photos of passages from books, usually of passages I'd like to revisit one day, and fail to revisit them because they become buried in my camera roll. I'd also never used CSS modules or Node prior to this project and though it'd be a good excuse to try.

The site allows me to upload these images and tag them with a title, author, and add an optional note. It displays all my images in a gallery view and lets me click on details.

### Implementation details

The site uses React with TypeScript on the frontend and Node with Express on the backend. Styling uses CSS modules, API requests use `axios`, images are hosted in R2, and the Postgres database is managed with Neon. The `/upload` page is gated by login using PassportJS.

### Future tasks

Future improvements I'd like to make include, but are not limited to:

- Add pagination
- Add search
- Build a comprehensive index page

### Transcription

A natural feature for this site is the ability to auto-transcribe each quote for further processing, categorizing, or analysis. At the moment, I'd rather tag images manually; until I find a good use case, I'd prefer to keep the images as images, rather than text. I like seeing the background and the physical page I read, keeping it somewhat "low-fi."
