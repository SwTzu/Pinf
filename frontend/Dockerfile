FROM node:20-slim

WORKDIR /app

# Copiar el archivo de entorno
COPY .env.local .env.local

# Copiar todo el código del frontend
COPY . .

# Exponer el puerto para el frontend
EXPOSE 3000

# Comando para instalar dependencias, construir y servir la aplicación
CMD ["sh", "-c", "npm install && npm run build && npm start"]