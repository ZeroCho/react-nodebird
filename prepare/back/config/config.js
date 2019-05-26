const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  'development': {
    'username': 'root',
    'password': 'nodejsbook',
    'database': 'react-nodebird',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'test': {
    'username': 'root',
    'password': 'nodejsbook',
    'database': 'react-nodebird',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'production': {
    'username': 'root',
    'password': 'nodejsbook',
    'database': 'react-nodebird',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  }
};

