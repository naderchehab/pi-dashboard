const MongoClient = require('mongodb').MongoClient;

let db = null;

function init(callback) {
    if (db) {
        // TODO: this doesn't work, connection is never reused
        console.log(new Date(), 'Reusing db connection...');
        return callback(null, db);
    }

    console.log(new Date(), 'Creating new db connection...');
    MongoClient.connect('mongodb://localhost:27017/pi', (err, dbObj) => {
      if(err) {
        console.log(new Date(), 'DB connection failed', err);
        if (callback) {
              callback(err);
          }
      }
      console.log(new Date(), 'DB connection success');
      db = dbObj;
    if (callback) {
          callback();
      }
    });
}

function insert(collectionName, doc, callback) {
    let collection = db.collection(collectionName);
    doc.insertDate = new Date();
    collection.insert(doc, null, (err, result) => {
        if (err) {
            console.log(new Date(), 'insert failed', err);
            if (callback) {
                callback(err);
            }
            return;
        }
        if (callback) {
            callback(null, result);
        }
        return;
    });
}

function find(collectionName, callback) {
    let collection = db.collection(collectionName);
    collection.find({}).sort({'insertDate': -1}).toArray(function(err, docs) {
        if (err) {
            console.log(new Date(), 'find failed', err);
            return callback(err);
        }
        callback(null, docs);
    });
}

module.exports = {
    init,
    insert,
    find
};
