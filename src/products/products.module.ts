import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module.js';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';

import { ProductImage } from './entities/product-image.entity.js';
import { Product } from './entities/product.entity.js';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product, ProductImage]),
            AuthModule
          ],
  exports: [ProductsService, TypeOrmModule]
})
export class ProductsModule {}
