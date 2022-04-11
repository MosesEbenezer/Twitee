FROM node:14 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls -la

FROM node:14
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3021
RUN ls -la
COPY ./.env /app/dist/src/.env
CMD ["npm", "run", "start:prod"]
