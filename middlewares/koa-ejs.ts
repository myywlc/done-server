import ejs = require('koa-ejs');
import { join } from 'path';
import { Daruk, defineMiddleware, injectable, MiddlewareClass } from 'daruk';

@defineMiddleware('koa-ejs')
class KoaEjs implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    ejs(daruk.app, {
      root: join(daruk.options.rootPath, './view'),
      viewExt: 'ejs',
    });
  }
}
