# base image
FROM node:20

# set working directory inside container
WORKDIR /app

# copy package files
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code
COPY . .

# expose port
EXPOSE 5000

# run the app
CMD ["npm", "run", "dev"]
