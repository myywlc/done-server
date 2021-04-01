import { DarukServer, DarukContext, Daruk } from 'daruk';
import config from './config';

(async () => {
  let app = DarukServer({
    name: 'myapp',
    rootPath: __dirname,
    // 也可以放404的中间件
    middlewareOrder: ['koa-ejs', 'koa-favicon', 'errorMid', 'cors'],
  });

  app.on('access', (ctx: DarukContext) => {
    console.log(ctx.request.id);
  });

  app.on('exit', (err: Error, daruk: Daruk) => {
    // maybe you can send a exit error or email
    daruk.logger.error('exit');
  });

  await app.loadFile('./glues');
  await app.loadFile('./services');
  await app.loadFile('./middlewares');
  await app.loadFile('./controllers');
  await app.binding();
  app.listen(config.port);
  app.logger.info(`app listen port ${config.port}`);
})();
