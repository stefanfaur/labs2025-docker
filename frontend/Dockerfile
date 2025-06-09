# --------------------------------------------
# STAGE 1: Build the Angular app
# --------------------------------------------
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# 1. Copy only package.json & package-lock.json to leverage Docker cache
COPY package.json package-lock.json ./

# 2. Install dependencies
RUN npm ci

# 3. Copy the rest of the source code
COPY . .

# 4. Build the Angular app in production mode
#    This will produce a folder at "/app/dist/pizza_app/browser"
RUN npm run build --production

# --------------------------------------------
# STAGE 2: Serve with Nginx
# --------------------------------------------
FROM nginx:latest

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# 5. Copy the built files from the 'builder' stage
#    Note the trailing "/." so that contents of dist/pizza_app go
#    directly into /usr/share/nginx/html (not an extra subfolder).
COPY --from=builder /app/dist/pizza_app/browser/. /usr/share/nginx/html

# Copy our custom nginx.conf over the default one
COPY nginx.conf /etc/nginx/nginx.conf


# 6. Expose port 80
EXPOSE 80

# 7. Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
