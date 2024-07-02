export type TField = {
  value: string | boolean;
  error: string;
  status?: boolean;
};

export type FeedItem = {
  title: string;
  time: string;
  description?: string;
  imgUrl: string;
  id: number;
};

export type TabItem = {
  title: string;
  slug: string;
  id: number;
};


export interface IForm {
  [key: string]: TField;
}