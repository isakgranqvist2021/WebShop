import dotenv from 'dotenv';

dotenv.config() // read .env variables into the node runtime

export default { // export a config object which will be used in main.js 

    // the server will listen on this 
    PORT: parseInt(process.env.PORT) || 3000,

    // the database should be accessible on this uri
    DB_URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@bigandimportantcluster.mebkn.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`
}