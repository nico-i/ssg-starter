// Example OG template
module.exports = ({ title, image, font }) => `
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        @font-face {
          font-family: 'Example Font'; //TODO: Change this to your font
          src: url(data:application/x-font-woff;charset=utf-8;base64,${font})
                  format('woff supports variations'),
                  url(data:application/x-font-woff;charset=utf-8;base64,${font}) format('woff-variations');
          font-style: normal;
          font-weight: 400 800;
          font-display: swap;
        }

        body {
          // TODO: Add your own styles here
          overflow: hidden;
          display: flex;
          height: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: black;
        }

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }
      </style>
    </head>

    <body>
        <h1>${title}</h1>
        <img src="${image}" />
    </body>
  </html>
`;
