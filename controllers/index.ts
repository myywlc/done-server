import { controller, DarukContext, get, inject, injectable, middleware, Next, prefix } from 'daruk';
import weather from '../services/weather';

@controller()
@prefix('/comments')
class Index {
  @inject('weather') private weather!: weather;

  @middleware('cors')
  @get('/')
  public async index(ctx: DarukContext, next: Next) {
    ctx.body = `Get weather information error, message123`;
  }
}
