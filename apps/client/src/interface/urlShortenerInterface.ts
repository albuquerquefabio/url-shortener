export interface UrlShortener {
  _id: string;
  original: string;
  short: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  status: boolean;
}
