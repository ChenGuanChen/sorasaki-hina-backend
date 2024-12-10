import path from 'path';
import { Express } from 'express';
import {readdirSync} from 'fs';
import {logger} from '../logger';

export async function loadPages(app: Express): Promise<void>{
  try{
    const foldersPath = path.join(__dirname, '../pages');
    const pageFolders = readdirSync(foldersPath).filter(file => file.endsWith('.ts'));
    for(const page of pageFolders){
      const pagePath = path.join(foldersPath, page);
      const data = await import(pagePath);
      if(data.page !== undefined)
        app.get(data.page.path, data.page.handleRequest);
      else
        logger.error(`The page at ${pagePath} is missing required properties.`);
    }
  }
  catch(err: unknown){
    logger.error(`${err} happened when loading pages`);
  }
}