import { controller, DarukContext, post, inject, injectable, middleware, Next, prefix } from 'daruk';
import weather from '../services/weather';
import User from '../entity/user';

@controller()
@prefix('/user')
class Index {
  @inject('weather') private weather!: weather;

  @post('/')
  public async index(ctx: DarukContext, next: Next) {
    let user = new User();
    user.name = "lin";
    user.age = 18;

    const a = await ctx.db.manager.save(user);
    ctx.body = `add user done, id is ${a.id}`;
  }
}
