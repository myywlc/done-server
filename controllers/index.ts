import { controller, DarukContext, get, post, put, del, inject, Next, prefix } from 'daruk';
import { validator, z } from 'decorator-validator';
import weather from '../services/weather';
import User from '../entity/user';

@controller()
@prefix('/user')
class Index {
  @inject('weather') private weather!: weather;

  @validator({
    body: z.object({
      name: z.string(),
      age: z.number(),
    }),
  })
  @post('/create')
  public async create(ctx: DarukContext) {
    const { name, age } = ctx.request.body;
    const user = new User();
    user.name = name;
    user.age = parseInt(age);

    const a = await ctx.db.manager.save(user);
    ctx.body = `add user done, id is ${a.id}`;
  }

  @validator({
    query: z.object({
      name: z.any(),
      age: z.any(),
    }),
  })
  @get('/list')
  public async index(ctx: DarukContext) {
    const { name, age } = ctx.query;
    const userRepository = ctx.db.getRepository(User);
    const dataParams: any = {};
    name && (dataParams['name'] = name);
    age && (dataParams['age'] = parseInt(typeof age === 'string' ? age : ''));
    const list = await userRepository.find(dataParams);

    ctx.body = {
      success: true,
      list,
    };
  }

  @validator({
    body: z.object({
      name: z.string(),
      age: z.number(),
    }),
    params: z.object({
      id: z.string(),
    }),
  })
  @put('/update/:id')
  public async update(ctx: DarukContext) {
    const { id } = ctx.params;
    const { name, age } = ctx.request.body;
    const userRepository = ctx.db.getRepository(User);
    const user = await userRepository.findOne(parseInt(id));
    user.name = name;
    user.age = parseInt(age);
    await userRepository.save(user);

    ctx.body = {
      success: true,
      user,
    };
  }

  @validator({
    params: z.object({
      id: z.string(),
    }),
  })
  @del('/del/:id')
  public async remove(ctx: DarukContext) {
    const { id } = ctx.params;
    const userRepository = ctx.db.getRepository(User);
    const user = await userRepository.findOne(parseInt(id));
    await userRepository.remove(user);

    ctx.body = {
      success: true,
    };
  }
}
