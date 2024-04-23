const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://karthickdeva6800:Karthickdeva@cluster0.8uoqrjy.mongodb.net/';
mongoose.connect(MONGODB_URI, {});

const db = mongoose.connection;

db.on('connected', async () => {
  console.log('Connected to MongoDB successfully....');
  try {
    const admin = new mongoose.mongo.Admin(db.db);
    const listDatabases = await admin.listDatabases();
    console.log('List of databases:');
    listDatabases.databases.forEach(async (db) => {
    console.log(`- ${db.name}`);
    });
  } catch (error) {
    console.error('Error listing databases and projects:', error);
  }
});
db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

module.exports = db;
