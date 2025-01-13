# Usa una imagen base de Node.js compatible
FROM node:20-alpine

# Configura el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY package*.json ./
COPY . .

# Exponer el puerto del backend
EXPOSE 3002

# Definir un entrypoint personalizado
ENTRYPOINT ["sh", "-c", "npm install && npm start"]