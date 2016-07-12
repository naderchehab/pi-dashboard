const MongoClient = require('mongodb').MongoClient;

let db = null;

function init() {
    if (db) {
        console.log('Reusing db connection...');
        return callback(null, db);
    }

    console.log('Creating new db connection...');
    MongoClient.connect('mongodb://localhost:27017/pi', (err, dbObj) => {
      if(err) {
        console.log('DB connection failed', err);
      }
      console.log('DB connection success');
      db = dbObj;
    });
}

function insert(collectionName, doc, callback) {
    let collection = db.collection(collectionName);
    doc.insertDate = new Date();
    collection.insert(doc, null, (err, result) => {
        if (err) {
            console.log('insert failed', err);
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
            console.log('find failed', err);
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
