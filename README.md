# Sistema de Gestión de Inventario de una Tienda

API REST introductoria construida con NestJS 11 y TypeScript para administrar
productos. No utiliza una base de datos: los registros se guardan en memoria y
se pierden al detener o reiniciar el servidor.

## Requisitos e inicio

Se requiere Node.js y npm. Desde esta carpeta:

```bash
npm install
npm run start:dev
```

El servidor escucha en `http://localhost:3000` de forma predeterminada. Se puede
configurar otro puerto con la variable de entorno `PORT`.

## Rutas

| Método | Ruta | Descripción | Respuesta exitosa |
| --- | --- | --- | --- |
| GET | `/` | Comprueba que el servidor funciona. | 200 |
| POST | `/productos` | Crea un producto. | 201 |
| GET | `/productos` | Lista todos los productos. | 200 |
| GET | `/productos/:id` | Busca un producto por id. | 200 |
| PUT | `/productos/:id` | Reemplaza los cuatro campos del producto. | 200 |
| PATCH | `/productos/:id` | Modifica uno o más campos. | 200 |
| DELETE | `/productos/:id` | Elimina el producto y devuelve el registro eliminado. | 200 |

Un producto tiene `id` y fechas generados por el servidor, además de los
campos requeridos `nombre` (texto no vacío), `precio` (número mayor que cero),
`stock` (entero no negativo) y `categoria` (texto no vacío). Los errores de
validación responden con 400 y los productos inexistentes con 404.

## Ejemplos

Crear un producto:

```bash
curl -X POST http://localhost:3000/productos \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Cuaderno","precio":2.5,"stock":10,"categoria":"Papelería"}'
```

Listar y consultar por id:

```bash
curl http://localhost:3000/productos
curl http://localhost:3000/productos/1
```

Reemplazar todos los campos o modificar solo el stock:

```bash
curl -X PUT http://localhost:3000/productos/1 \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Cuaderno grande","precio":3.5,"stock":8,"categoria":"Papelería"}'

curl -X PATCH http://localhost:3000/productos/1 \
  -H 'Content-Type: application/json' \
  -d '{"stock":5}'
```

Eliminar un producto:

```bash
curl -X DELETE http://localhost:3000/productos/1
```

## Pruebas y compilación

```bash
npm run build
npm test -- --runInBand
npm run test:e2e -- --runInBand
```

Las pruebas unitarias cubren la lógica del servicio y las pruebas e2e ejercitan
las rutas HTTP y la validación de solicitudes.
