import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module.js';
import { CommonModule } from './common/common.module.js';
import { SeedModule } from './seed/seed.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
      TypeOrmModule.forRoot({      
        host: process.env.DB_HOST,      
        type: 'postgres',      
        database: process.env.DB_NAME,      
        port: 5432,      
        password: process.env.DB_PASSWORD,      
        username: process.env.DB_USERNAME,      
        synchronize: true,
        autoLoadEntities: true,     
	}),
      ProductsModule,
      CommonModule,
      SeedModule,
      AuthModule
  ],
})
export class AppModule {}
