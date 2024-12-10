import {Request, Response} from 'express';

abstract class Page{
  abstract get path(): string;
  abstract handleRequest(req: Request, res: Response): Promise<void>;
};

export default Page;