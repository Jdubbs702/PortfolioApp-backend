# Use an official Node.js runtime as a parent image
FROM node:16-alpine

WORKDIR /app

# COPY ["pet_portal-backend/package.json", "pet_portal-backend/package-lock.json", "./"]
COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install
COPY . .

EXPOSE 5000

CMD ["node", "express.js"]