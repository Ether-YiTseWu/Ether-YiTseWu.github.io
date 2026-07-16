# Yi-Tse Wu (Ether) Portfolio

A responsive, dependency-free personal portfolio for GitHub Pages.

## Features

- Responsive single-page layout
- Light / dark theme with saved preference
- Awards, patent and gallery rendered from one data file
- Image lightbox
- No build tool, framework or CDN dependency
- Ready for GitHub Pages

## Project structure

```text
.
├── index.html
├── .nojekyll
├── README.md
└── assets
    ├── css/styles.css
    ├── js/app.js
    ├── js/site-data.js
    └── images/
```

## Update content later

Most text and records are stored in:

```text
assets/js/site-data.js
```

To add a new competition result, append another object to `awards`.
To add a patent, append another object to `patents`.
To add a photograph, append another object to `gallery` and place the image in `assets/images/`.

## Deploy to GitHub Pages

1. Back up the current repository.
2. Copy all files from this folder to the root of `ether-yitsewu.github.io`.
3. Commit and push:

```bash
git add .
git commit -m "Redesign portfolio website"
git push origin main
```

4. In GitHub: **Settings → Pages**.
5. Select **Deploy from a branch**, branch `main`, folder `/ (root)`.

The site will be published at:

```text
https://ether-yitsewu.github.io/
```

## Notes

- The profile image was cropped from the supplied screenshot. Replace `assets/images/profile.webp` with a higher-resolution original when available.
- For a custom domain, add a `CNAME` file containing the domain name.
