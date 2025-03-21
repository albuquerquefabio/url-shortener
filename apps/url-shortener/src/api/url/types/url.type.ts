import { Document } from 'mongoose';
import { Url } from '../entities/url.entity';

export type UrlDocument = Url & Document;
