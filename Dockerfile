# Utiliza una imagen base de Node.js
FROM node:20.11.1

# Establece el directorio de trabajo en la aplicación
WORKDIR /app

# Copia el archivo package.json e instala las dependencias
COPY package.json .
RUN npm install

# Copia todos los archivos al directorio de trabajo
COPY . .

# Comando para construir la aplicación de React
CMD ["npm", "start"]