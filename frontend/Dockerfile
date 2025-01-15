FROM node:20-slim

WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto del frontend
EXPOSE 3000

# Verificar si node_modules existe antes de instalar dependencias
CMD ["sh", "-c", "[ ! -d node_modules ] && npm install && npm run build; npm start"]
