import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DATABASE_TYPE } from '../../environments';
import { getMetadataArgsStorage, createConnection } from 'typeorm';

import config from '../../config.orm';
import { Product } from '../../modules/products/entities/product.entity';
// import { logger } from '../../common'

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const options = {
      ...config,
      type: DATABASE_TYPE,
      // entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
      entities: [Product],
      // migrations: ['src/modules/**/migration/*.ts'],
      // subscribers: ['src/modules/**/subscriber/*.ts'],
      // cli: {
      // entitiesDir: '../../modules/**/entities',
      // 	migrationsDir: 'src/modules/**/migration',
      // 	subscribersDir: 'src/modules/**/subscriber'
      // },
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepConnectionAlive: true,
      logging: true
    };
    createConnection(options)
      .then(data => {
        // logger.info(data)
        Logger.log(`☁️  Database connected`, 'TypeORM', false);
      })
      .catch(err => {
        // logger.error(err)
        Logger.error(`❌  Database connect error`, '', 'TypeORM', false);
      });

    return options;
  }
}
