FROM nginx:mainline-alpine
COPY ./dist/apps/client/shell /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
