import { Daruk, DarukContext, defineMiddleware, MiddlewareClass, Next } from 'daruk';

@defineMiddleware('globalErrorCapture')
class GlobalErrorCapture implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return async (ctx: DarukContext, next: Next) => {
      try {
        await next();
      } catch (err) {
        ctx.body = {
          success: false,
          msg: err.message,
        };
      }
    };
  }
}
