# Use lightweight, production-ready Nginx Alpine image
FROM nginx:alpine

# Metadata
LABEL maintainer="Compiler Design Lab" \
      description="Ubuntu Dark Wikipedia-Style Compiler Design Practicals Portal"

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy website files to Nginx public html directory
COPY . /usr/share/nginx/html/

# Expose standard HTTP port 80
EXPOSE 80

# Health check to ensure the web server is healthy
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
