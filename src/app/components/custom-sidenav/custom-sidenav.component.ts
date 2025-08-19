import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';
import { RouterLinkActive } from "@angular/router";

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  template: `
    <div class="sidenav-header">
      <img [width]="profilePicSize()" [height]="profilePicSize()" src="assets/pfp.jpg" alt="pfp.jpg">
      <div class="header-text" [class.hide-header-text]="sideNavCollapsed()">
        <h2>Admin Dashboard</h2>
        <p>Welcome, Admin!</p>
      </div>
    </div>

    <mat-nav-list>
      <a 
      mat-list-item 
      *ngFor="let item of menuItems()" 
      [routerLink]="item.route"
      routerLinkActive
      #rla="routerLinkActive"
      [activated]="rla.isActive"
      >
        <mat-icon matListItemIcon>{{item.icon}}</mat-icon>
        <span matListItemTitle *ngIf="!sideNavCollapsed()">{{item.label}}</span>
      </a>
    </mat-nav-list>
  `,
  styles: `
  
  .sidenav-header {
      text-align: center;
      padding-top: 24px;

      > img {
          border-radius: 100%;
          object-fit: cover;
          margin-bottom: 10px
      }
      }
    
  
    .header-text {
      > h2 {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5rem;
      }

      > p {
        margin: 0;
        font-size: 0.8rem;
      }
    }
    
    .hide-header-text{
      opacity:0;
      height: 0;
    }
  `
})
export class CustomSidenavComponent {

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  profilePicSize  = computed(() => this.sideNavCollapsed() ? '32' : '100');

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard'
    },
    {
      icon: 'video_library',
      label: 'Content',
      route: 'content'
    },
    {
      icon: 'analytics',
      label: 'Analytics',
      route: 'analytics'
    },
    {
      icon: 'comment',
      label: 'Comments',
      route: 'comments'
    }
  ]);
}
