import { Request, Response } from "express";
import { Readable } from "stream";
import { Client } from "minio";

import Page from "../classes/page";
import { config } from "../config";
import { logger } from "../logger";

const client = new Client(config.minio.client);

async function fetchImage(file: string): Promise<Readable | null> {
  try {
    return await client.getObject(config.minio.bucket, file);
  } catch(err: unknown) {
    console.log(`Fail to fetch image ${file}`);
  }
  return null;
}

class imgRes extends Page{
    get path(){
        return "/files/:util/:catagory/:action/:name.:ext"
    }
    async handleRequest(req: Request, res: Response): Promise<void>{
        try{
            logger.info(`received req!`)
            const targetPath = `/${req.params.util}` + `/${req.params.catagory}`
              + `/${req.params.action}` + `/${req.params.name}` + `.${req.params.ext}`;
            const imageStream = await fetchImage(targetPath);
            if (!imageStream) {
                res.status(404).send("Required Resource Doesn't Exist");
                return;
            }
            logger.info(`GET!!`)
            res.set({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': `image/${targetPath.split('.').pop()}`
            });
            await new Promise<void>((resolve, reject) => {
                imageStream.pipe(res);
                imageStream.on('end', () => { 
                    logger.info(`Response with ${targetPath}`);
                    resolve();
                });
            });
        }
        catch(err: unknown){
            logger.error(`${err} when handling img request`)
        }
    }
}

export const page = new imgRes();