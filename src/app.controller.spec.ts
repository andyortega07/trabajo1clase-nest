import assert from 'node:assert/strict';
import { test } from '@jest/globals';
import { AppController } from './app.controller';
import { AppService } from './app.service';

test('la ruta raíz indica que el servidor está funcionando', () => {
  const appController = new AppController(new AppService());
  const respuesta = appController.getHello();

  assert.equal(
    respuesta,
    'El servidor de gestión de inventario está funcionando.',
  );
});
