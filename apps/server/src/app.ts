import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import koaLogger from "koa-logger";
import cors from "@koa/cors";
import { routerServer } from './serverRouter';

const app = new Koa();

const router = new Router();

export const statusMiddleware = async (ctx) => {
  try {
    ctx.body = "Server Working";
    ctx.status = 200;
  } catch (err) {
    // eslint-disable-next-line
    console.log({
      err,
    });
    ctx.body = err.toString();
    ctx.status = 400;
  }
};

// needed for sentry to log data correctly
app.use(bodyParser());

app.on("error", (err, ctx) => {
  // We should just call logger.error here, and send it
  //  to logstash which in turn sends to sentry.
  // see http://clarkdave.net/2014/01/tracking-errors-with-logstash-and-sentry/
  // eslint-disable-next-line
  console.log("Error while answering request", { error: err });
});

app.use(koaLogger());
//app.use(convert(cors({ maxAge: 86400, origin: '*', credentials: true })));
app.use(cors({ maxAge: 86400, credentials: true }));

router.get('/status', statusMiddleware);

app.use(router.routes()).use(router.allowedMethods());
app.use(routerServer.routes()).use(routerServer.allowedMethods())

export default app;