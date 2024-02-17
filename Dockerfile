# base stage
# **********
FROM node:20.9.0-alpine as base

WORKDIR /app

# Copy package.json to /app
COPY package.json ./

# Copy available lock file
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN npm install

#angular compatibilty compiler for compiling libraries that have been published in the legacy format
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points

# Copy all other files excluding the ones in .dockerignore
COPY . .
# COPY ./ /app/
RUN npm run build



FROM nginx:latest
COPY --from=base /app/dist/user-management-system/ /usr/share/nginx/html

EXPOSE 80