import { Component } from '@angular/core';

@Component({ //component decorator
  selector: 'app-root',
  templateUrl: './app.component.html',  //template:`<h1>{{title}}</h1>...`
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'conFusion';
}
