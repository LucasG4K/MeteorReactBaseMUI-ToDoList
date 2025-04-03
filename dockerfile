# Usa Node.js 22 como base
FROM node:22

# Define o diretório de trabalho no container
WORKDIR /app

# Instala o Meteor globalmente
RUN npm install -g meteor@3.1.2 --unsafe-perm && \
    ln -s /root/.meteor/meteor /usr/local/bin/meteor

# Copia os arquivos do projeto para dentro do container
COPY . /app

# Define variável de ambiente para permitir execução como root
ENV METEOR_ALLOW_SUPERUSER=1

# Instala dependências do projeto
RUN meteor npm install

# Instala React 19 explicitamente
RUN meteor npm install react@19 react-dom@19

# Expõe a porta do Meteor
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["meteor", "run", "--port", "3000"]
