var config = module.exports = {};

config.hostname = 'http://localhost:3000';
config.database = {
  url: 'mongodb://localhost:27017/test',
  secret: 'thisIsASecretToOurdatabase'
}
