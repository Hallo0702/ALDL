FROM node:16.17.0 as build-stage

# RUN mkdir -p /var/jenkins_home/client

WORKDIR /var/jenkins_home/workspace/client/client


COPY ./ ./

RUN npm install

RUN npm run build

EXPOSE 3000
CMD ["npm","start"]

# FROM nginx:stable-alpine as production-stage

# COPY --from=build-stage /var/jenkins_home/workspace/CLIENT/client/build /usr/share/nginx/html
#COPY --from=build-stage /var/jenkins_home/workspace/deploytest/testproject_react/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx","-g","daemon off;"]
