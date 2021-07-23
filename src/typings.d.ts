import { Request } from 'express';
import { IUser } from './user/schema/user.schema';

interface ReqWithUser extends Request {
  user: IUser;
}
