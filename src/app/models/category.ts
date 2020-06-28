import { Applet } from './applet';

export class Category {


  //reference to Applet instead of appletName
  //because a reference uses less memory than string
  applets : Applet[] = [];

  constructor(public name: string){
  }
}
