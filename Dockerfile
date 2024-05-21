# Use uma imagem base do Node.js
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código fonte para o diretório de trabalho
COPY . .

# Execute o comando de build
RUN npm run build

# Exponha a porta em que o aplicativo irá escutar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
