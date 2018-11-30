const config = {};

config.hostname = 'http://localhost:3000';
config.front = 'http://localhost:8080';
config.database = {
  url: 'mongodb://localhost:27017/test',
  secret: 'thisIsASecretToOurdatabase'
};
config.aws = {

};
config.jwtSecret = 'super secret jwt secret';

export default config;
