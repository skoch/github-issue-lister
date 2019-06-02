const express = require('express');
const next = require('next');

const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const application = next({
  dev: isDev,
});
const handle = application.getRequestHandler();

application.prepare()
  .then(() => {
    const server = express();

    // catch-all
    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
