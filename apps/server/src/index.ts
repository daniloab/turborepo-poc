import { createServer } from "http";

import app from "./app";

(async () => {
  const server = createServer(app.callback());

  server.listen(9002, () => {
    console.log(`server running at http://localhost:9002`);
  });
})();
