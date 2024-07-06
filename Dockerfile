FROM node:20.14 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build --configuration=production
FROM nginx:alpine
COPY --from=build /app/dist/store-app/browser /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html/assets \
    && chmod -R 755 /usr/share/nginx/html/assets
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

