import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applet-list',
  templateUrl: './applet-list.component.html',
  styleUrls: ['./applet-list.component.css'],
  inputs:["appletNames"]
})
export class AppletListComponent implements OnInit {

  appletNames: string[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
