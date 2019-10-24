import { ICreator } from "./creator.interface";

export interface Media {
  readonly title: string;
  readonly description: string;
  readonly tags: string[];
  // readonly likes: number;
  readonly categorie: string;
  // readonly comments: any[];
  readonly visibility: string;
  readonly creator: ICreator;
  readonly createdAt: Date;
  readonly updatedAt: Date; 
}