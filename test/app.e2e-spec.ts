import assert from 'node:assert/strict';
import { test } from '@jest/globals';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { CreateProductDto } from '../src/products/dto/create-product.dto';
import { AppModule } from '../src/app.module';

interface ProductResponse extends CreateProductDto {
  id: number;
  createdAt: string;
  updatedAt: string;
}

function sendRequest(app: INestApplication) {
  return request(app.getHttpServer() as App);
}

async function withApplication(
  run: (app: INestApplication) => Promise<void>,
): Promise<void> {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.init();

  try {
    await run(app);
  } finally {
    await app.close();
  }
}

async function createProduct(
  app: INestApplication,
  product: CreateProductDto,
): Promise<ProductResponse> {
  const response = await sendRequest(app).post('/productos').send(product);

  assert.equal(response.status, 201);
  return response.body as ProductResponse;
}

test('GET / indica que el servidor está funcionando', async () => {
  await withApplication(async (app) => {
    const response = await sendRequest(app).get('/');

    assert.equal(response.status, 200);
    assert.equal(
      response.text,
      'El servidor de gestión de inventario está funcionando.',
    );
  });
});

test('crea y lista productos', async () => {
  await withApplication(async (app) => {
    const product = await createProduct(app, {
      nombre: 'Cuaderno',
      precio: 2.5,
      stock: 10,
      categoria: 'Papelería',
    });

    assert.equal(product.id, 1);
    assert.equal(product.nombre, 'Cuaderno');
    assert.equal(typeof product.createdAt, 'string');
    assert.equal(typeof product.updatedAt, 'string');

    const response = await sendRequest(app).get('/productos');
    const products = response.body as ProductResponse[];

    assert.equal(response.status, 200);
    assert.equal(products.length, 1);
    assert.equal(products[0].id, 1);
  });
});

test('busca un producto por identificador', async () => {
  await withApplication(async (app) => {
    await createProduct(app, {
      nombre: 'Lápiz',
      precio: 1,
      stock: 20,
      categoria: 'Papelería',
    });

    const response = await sendRequest(app).get('/productos/1');
    const product = response.body as ProductResponse;

    assert.equal(response.status, 200);
    assert.equal(product.nombre, 'Lápiz');
  });
});

test('reemplaza un producto y permite modificarlo parcialmente', async () => {
  await withApplication(async (app) => {
    await createProduct(app, {
      nombre: 'Botella',
      precio: 8,
      stock: 4,
      categoria: 'Hogar',
    });

    const putResponse = await sendRequest(app).put('/productos/1').send({
      nombre: 'Botella térmica',
      precio: 12,
      stock: 6,
      categoria: 'Hogar',
    });
    const replacedProduct = putResponse.body as ProductResponse;

    assert.equal(putResponse.status, 200);
    assert.equal(replacedProduct.nombre, 'Botella térmica');
    assert.equal(replacedProduct.precio, 12);

    const patchResponse = await sendRequest(app)
      .patch('/productos/1')
      .send({ stock: 3 });
    const updatedProduct = patchResponse.body as ProductResponse;

    assert.equal(patchResponse.status, 200);
    assert.equal(updatedProduct.stock, 3);
    assert.equal(updatedProduct.nombre, 'Botella térmica');
  });
});

test('elimina un producto', async () => {
  await withApplication(async (app) => {
    await createProduct(app, {
      nombre: 'Taza',
      precio: 5,
      stock: 2,
      categoria: 'Hogar',
    });

    const deleteResponse = await sendRequest(app).delete('/productos/1');
    const findResponse = await sendRequest(app).get('/productos/1');

    assert.equal(deleteResponse.status, 200);
    assert.equal(findResponse.status, 404);
  });
});

test('rechaza datos de producto inválidos', async () => {
  await withApplication(async (app) => {
    const response = await sendRequest(app).post('/productos').send({
      nombre: ' ',
      precio: 0,
      stock: 1.5,
      categoria: '',
    });

    assert.equal(response.status, 400);
  });
});

test('rechaza una actualización parcial vacía', async () => {
  await withApplication(async (app) => {
    await createProduct(app, {
      nombre: 'Taza',
      precio: 5,
      stock: 2,
      categoria: 'Hogar',
    });

    const response = await sendRequest(app).patch('/productos/1').send({});

    assert.equal(response.status, 400);
  });
});

test('rechaza identificadores inválidos y productos inexistentes', async () => {
  await withApplication(async (app) => {
    const invalidIdResponse = await sendRequest(app).get(
      '/productos/no-es-un-id',
    );
    const missingProductResponse = await sendRequest(app).get('/productos/99');
    const missingDeleteResponse =
      await sendRequest(app).delete('/productos/99');

    assert.equal(invalidIdResponse.status, 400);
    assert.equal(missingProductResponse.status, 404);
    assert.equal(missingDeleteResponse.status, 404);
  });
});
