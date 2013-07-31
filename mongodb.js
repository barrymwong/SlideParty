var mongo = require('mongodb')
  , Db = mongo.Db
  , DbServer = mongo.Server;

dbClient = new Db('test', new DbServer('127.0.0.1', 27017), {safe:false});

exports.insertData = function(err, collection) {
  collection.insert({title: 'My Presentation'});
  collection.insert({image: 'http://barrymwong.com/images/pacific_ave.jpg'});
  collection.insert({image: 'http://mathblag.files.wordpress.com/2011/11/fibonacci_pigeons.jpg'});
  collection.insert({image: 'https://i.chzbgr.com/maxW500/7670554368/hA827CEEC/'});
  collection.insert({title: 'Hello Wrrld!!!'}); 
  collection.insert({title: 'Errmergerrd!'});
};

exports.removeData = function(err, collection) {
  collection.remove();
};

dbClient.open(function(err, pClient) {
  dbClient.collection('test_insert', exports.removeData);
  dbClient.collection('test_insert', exports.insertData);
});