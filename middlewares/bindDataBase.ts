import { Daruk, DarukContext, defineMiddleware, MiddlewareClass, Next } from 'daruk';
import { createConnection } from 'typeorm';
import config from '../config';
import User from '../entity/user';

function getConnection() {
  let db_connection: any = null;
  return () => {
    return new Promise((resolve, reject) => {
      if (db_connection) {
        resolve(db_connection);
      } else {
        // @ts-ignore
        createConnection({
          type: config.db.type,
          host: config.db.host,
          port: config.db.port,
          username: config.db.username,
          password: config.db.password,
          database: config.db.database,
          entities: [User],
          synchronize: true,
          logging: false,
        })
          .then((connection) => {
            console.log('数据库连接成功');
            db_connection = connection;
            resolve(db_connection);
          })
          .catch((error) => {
            console.log(error, 'error');
            reject(error);
          });
      }
    });
  };
}

const getDB = getConnection();

@defineMiddleware('bindDataBase')
class BindDataBase implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return async (ctx: DarukContext, next: Next) => {
      ctx.db = await getDB();
      await next();
    };
  }
}
