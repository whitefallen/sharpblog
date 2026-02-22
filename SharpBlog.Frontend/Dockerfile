FROM node:22-alpine AS build
WORKDIR /app
COPY SharpBlog.Frontend/package*.json ./
RUN npm install
COPY SharpBlog.Frontend/ .
RUN npm run build

FROM nginx:1.27-alpine AS runtime
COPY SharpBlog.Frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]