import { controller, DarukContext, get, post, put, del, inject, Next, prefix } from 'daruk';
import weather from '../services/weather';

@controller()
class Index {
  @inject('weather') private weather!: weather;

  @get('/')
  public async index(ctx: DarukContext) {
    await ctx.render('index', {
      comments: [{
        name: 'lin',
        content: '18',
      }],
      counts: 1,
      page: 1,
      limit: 10,
    });
  }
}
