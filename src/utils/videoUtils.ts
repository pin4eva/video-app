import { Request } from 'express';
import { extname } from 'path';

export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (arg0: any, arg1: string) => void,
) => {
  const name = file.originalname
    .split('.')[0]
    .split(' ')
    .join('-')
    .toLowerCase();
  const fileExtname = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtname}`);
};

export const videoFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (arg0: Error, arg1: boolean) => void,
) => {
  if (!file.originalname.match(/\.(mp4|avi|wmv)$/)) {
    return callback(
      new Error('Videos must be any of .mp4, .avi or .wmv'),
      false,
    );
  }
  callback(null, true);
};
