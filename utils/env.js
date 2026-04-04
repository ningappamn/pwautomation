//create environment loader 

import dotenv from 'dotenv';
import path from 'path';

//Reads environment variable (default = dev)

const ENV = process.env.TARGET_ENV || 'dev';

//build file path 
//path.resolve() convert relative path to absolute path
const envPath = path.resolve(process.cwd(), `config/${ENV}.env`);

//load env file 
dotenv.config({ path: envPath });

//export values 
export const env = {
  URL: process.env.URL,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD
};