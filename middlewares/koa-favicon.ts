import favicon = require('koa-favicon');
import { Daruk, defineMiddleware, injectable, MiddlewareClass } from 'daruk';

@defineMiddleware('koa-favicon')
class Favicon implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return favicon(`${daruk.options.rootPath}/public/favicon.png`);
  }
}
