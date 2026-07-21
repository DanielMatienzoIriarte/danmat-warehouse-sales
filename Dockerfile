# Stage 1: Build TypeScript
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production execution
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist

EXPOSE 30000
CMD ["node", "dist/index.js"]
