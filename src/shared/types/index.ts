export interface Data {
  date: number;
  text: string;
}

export interface Article {
  topic: string;
  data: Data[];
}
