import { controller, DarukContext, del, get, post, prefix, put } from 'daruk';
import { validator, z } from 'decorator-validator';
import Data from '../entity/data';

@controller()
@prefix('/data')
class DataController {
  @validator({
    body: z.object({
      key: z.string(),
      data: z.string(),
    }),
  })
  @post('/create')
  public async create(ctx: DarukContext) {
    const { key, data } = ctx.request.body;
    const dataEntity = new Data();
    dataEntity.key = key;
    dataEntity.data = data;

    const a = await ctx.db.manager.save(dataEntity);
    ctx.body = `add user done, id is ${a.id}`;
  }

  @validator({
    query: z.object({
      key: z.any(),
    }),
  })
  @get('/list')
  public async index(ctx: DarukContext) {
    const { key } = ctx.query;
    const dataRepository = ctx.db.getRepository(Data);
    const dataParams: any = {};
    key && (dataParams['key'] = key);
    const list = await dataRepository.find(dataParams);

    ctx.body = {
      success: true,
      list,
    };
  }

  @validator({
    body: z.object({
      key: z.string(),
      data: z.string(),
    }),
    params: z.object({
      id: z.string(),
    }),
  })
  @put('/update/:id')
  public async update(ctx: DarukContext) {
    const { id } = ctx.params;
    const { key, data } = ctx.request.body;
    const dataRepository = ctx.db.getRepository(Data);
    const dataEntity = await dataRepository.findOne(parseInt(id));
    dataEntity.key = key;
    dataEntity.data = data;
    await dataRepository.save(dataEntity);

    ctx.body = {
      success: true,
      dataEntity,
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
    const dataRepository = ctx.db.getRepository(Data);
    const dataEntity = await dataRepository.findOne(parseInt(id));
    await dataRepository.remove(dataEntity);

    ctx.body = {
      success: true,
    };
  }
}
