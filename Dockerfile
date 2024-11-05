FROM nginx
EXPOSE 80 4000
COPY nginx.conf /etc/nginx/
COPY ChatCliente/src /usr/share/nginx/html/
RUN mkdir /root/ChatServidor
#COPY ChatServidor/index.js ChatServidor/package.json ChatServidor/cliente.js /root/ChatServidor/
COPY ChatServidor/ /root/ChatServidor/
RUN apt-get update
RUN apt-get install -y nodejs npm vim
RUN cd /root/ChatServidor && pwd && npm i
CMD ["sh", "-c", "nginx -g 'daemon off;' & node /root/ChatServidor/index.js"]