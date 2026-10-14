import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

const productIdPipe = new ParseIntPipe({
  exceptionFactory: () =>
    new BadRequestException(
      'El identificador debe ser un número entero válido.',
    ),
});

@Controller('productos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Product {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', productIdPipe) id: number): Product {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', productIdPipe) id: number,
    @Body() updateProductDto: CreateProductDto,
  ): Product {
    return this.productsService.update(id, updateProductDto);
  }

  @Patch(':id')
  patch(
    @Param('id', productIdPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Product {
    return this.productsService.patch(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', productIdPipe) id: number): Product {
    return this.productsService.remove(id);
  }
}
