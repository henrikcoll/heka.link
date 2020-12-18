const DB_URL = process.env.DB_URL || 'localhost/heka-link';

const monk = require('monk');
const db = monk(DB_URL);

const links = db.get('links');
links.createIndex({ slug: 1 }, { unique: true });

let arr = 'abcdefghijklmnopqrstuvwxyz-_0123456789'.split('')
let link = 'https://wp.heka.no'

//arr.forEach(slug => links.insert({ slug, link }))

module.exports = {
  links
}