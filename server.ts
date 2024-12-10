import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { loadPages } from './init/load-pages'
import { logger } from './logger';

export const app = express()

async function init() {
  try{
    await loadPages(app);
    app.listen(config.http.port, ()=>{
      console.log(`pic server up, listen on ${config.http.port}`);
    });
  }catch(err: unknown){
    logger.error(`${err} when init function`);
  }
}

try{
  init();
}catch(err: unknown){
  logger.error(`${err} happened when initing`);
}
