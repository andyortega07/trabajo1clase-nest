import assert from 'node:assert/strict';
import { test } from '@jest/globals';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

const productData: CreateProductDto = {
  nombre: 'Cuaderno',
  precio: 2.5,
  stock: 10,
  categoria: 'Papelería',
};

test('crea productos con identificador y fechas automáticos', () => {
  const service = new ProductsService();
  const product = service.create(productData);

  assert.equal(product.id, 1);
  assert.equal(product.nombre, productData.nombre);
  assert.equal(product.precio, productData.precio);
  assert.equal(product.stock, productData.stock);
  assert.equal(product.categoria, productData.categoria);
  assert.ok(product.createdAt instanceof Date);
  assert.equal(product.updatedAt, product.createdAt);
});

test('lista productos y busca uno por identificador', () => {
  const service = new ProductsService();
  const product = service.create(productData);

  assert.deepEqual(service.findAll(), [product]);
  assert.equal(service.findOne(product.id), product);
});

test('reemplaza los datos y conserva la fecha de creación', () => {
  const service = new ProductsService();
  const product = service.create(productData);
  const updated = service.update(product.id, {
    ...productData,
    nombre: 'Cuaderno grande',
  });

  assert.equal(updated.nombre, 'Cuaderno grande');
  assert.equal(updated.createdAt, product.createdAt);
  assert.ok(updated.updatedAt instanceof Date);
});

test('modifica solo los campos recibidos', () => {
  const service = new ProductsService();
  const product = service.create(productData);
  const patch: UpdateProductDto = { stock: 5 };
  const updated = service.patch(product.id, patch);

  assert.equal(updated.stock, 5);
  assert.equal(updated.nombre, productData.nombre);
  assert.equal(updated.precio, productData.precio);
  assert.equal(updated.categoria, productData.categoria);
});

test('elimina un producto', () => {
  const service = new ProductsService();
  const product = service.create(productData);

  assert.equal(service.remove(product.id), product);
  assert.deepEqual(service.findAll(), []);
});

test('rechaza una actualización parcial vacía', () => {
  const service = new ProductsService();
  service.create(productData);

  assert.throws(() => service.patch(1, {}), BadRequestException);
});

test('rechaza identificadores inválidos o inexistentes', () => {
  const service = new ProductsService();

  assert.throws(() => service.findOne(0), BadRequestException);
  assert.throws(() => service.findOne(42), NotFoundException);
});
