FROM node:lts-buster
RUN git clone https://github.com/SHEIKH-ALI-2424/SHEIKH-ALI-MD/root/SheikhIK
WORKDIR /root/SheikhIK
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]
