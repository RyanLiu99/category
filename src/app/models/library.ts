import { Applet } from './applet';
import { Category } from './category';

export class Library
{
  //just category names, but it is given data structure, so don't rename it
  categories:string[] = [];
  applets:Applet[] = [];

  //real categories, not just names
  //added property to make filtering easier
  //it added cost of memory, but it just
  //categoryXes: Category[];
}
