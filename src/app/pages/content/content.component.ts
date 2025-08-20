import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content',
  imports: [CommonModule, RouterOutlet],
  template: `
    <router-outlet ></router-outlet>
  `,
  styles: ``
})
export class ContentComponent {

}
