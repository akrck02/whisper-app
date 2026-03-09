export class Server {
  uuid?: string;
  profilePicture?: string;
  name?: string;
  description?: string;
  insertDate?: number;
  channels?: ChannelsByCategory;
}

export type ChannelsByCategory = { [category: string]: Channel[] };
