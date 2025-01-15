# Usa una imagen base de Node.js compatible
FROM node:20

# Configura el directorio de trabajo
WORKDIR /app

# Copia el archivo de dependencias
COPY package*.json ./

# Instala las dependencias necesarias de producción
RUN npm install --production

# Instala paquetes adicionales necesarios para tu sistema
RUN apt-get update && apt-get install -y \
    chromium \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libfreetype6 \
    libgcc1 \
    libglib2.0-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libxshmfence1 \
    libxtst6 \
    wget \
    xdg-utils \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copia el resto del código fuente
COPY . .

# Exponer el puerto definido en la aplicación
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
