import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [];
  private nextId = 1;

  create(createProductDto: CreateProductDto): Product {
    const now = new Date();
    const product = Object.assign(new Product(), {
      id: this.nextId++,
      ...createProductDto,
      createdAt: now,
      updatedAt: now,
    });

    this.products.push(product);
    return product;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    return this.findById(id);
  }

  update(id: number, updateProductDto: CreateProductDto): Product {
    const product = this.findById(id);
    Object.assign(product, updateProductDto, { updatedAt: new Date() });
    return product;
  }

  patch(id: number, updateProductDto: UpdateProductDto): Product {
    const providedFields = Object.fromEntries(
      Object.entries(updateProductDto).filter(
        ([, value]) => value !== undefined,
      ),
    );
    if (Object.keys(providedFields).length === 0) {
      throw new BadRequestException(
        'Debe proporcionar al menos un campo para actualizar.',
      );
    }

    const product = this.findById(id);
    Object.assign(product, providedFields, { updatedAt: new Date() });
    return product;
  }

  remove(id: number): Product {
    const product = this.findById(id);
    this.products.splice(this.products.indexOf(product), 1);
    return product;
  }

  private findById(id: number): Product {
    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestException(
        'El identificador debe ser un entero positivo.',
      );
    }

    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`No existe un producto con el id ${id}.`);
    }

    return product;
  }
}
