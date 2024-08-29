FROM node:20 AS build

WORKDIR /app

COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "run", "dev", "--host"]
