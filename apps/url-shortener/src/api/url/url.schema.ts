import { Schema } from 'mongoose';

export const UrlSchema = new Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
