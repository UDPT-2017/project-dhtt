module.exports={
/*
* This file contains the configurations information of FB login app.
* It consists of FB app information, database information.
*/

  "facebook_api_key"    :       "487015711643772",
  "facebook_api_secret" :       "7797fa4440353b54bda5d5be0d6e40ee",
  "callback_url"        :       "http://localhost:3000/auth/facebook/callback",
  "use_database"        :       "true",
  
  //Edit information of Postgre here:
  "host"                :       "localhost:5432",
  "username"            :       "postgres",
  "password"            :       "123456",
  "database"            :       "projectUDPT"
};
