import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';
import { RouterLinkActive } from "@angular/router";
import { MenuItemComponent } from "../menu-item/menu-item.component";

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
  subItems?: MenuItem[];
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MenuItemComponent],
  template: `
    <div class="sidenav-header">
      <img [width]="profilePicSize()" [height]="profilePicSize()" src="assets/pfp.jpg" alt="pfp.jpg">
      <div class="header-text" [class.hide-header-text]="sideNavCollapsed()">
        <h2>Admin Dashboard</h2>
        <p>Welcome, Admin!</p>
      </div>
    </div>

    <mat-nav-list>
      @for (item of menuItems(); track item.label) {
        <app-menu-item [item]="item" [collapsed]="sideNavCollapsed()" />
      }
    </mat-nav-list>
  `,
  styles: `
  
  :host * {
    transition: all 500ms ease-in-out;
  }

  .hide-header-text {
    display: none;
  }

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

      height: 3rem;

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
      height: 0 !important;
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
      route: 'content',
      subItems: [
        { icon: 'play_circle', label: 'Videos', route: 'videos' },
        { icon: 'playlist_play', label: 'Playlist', route: 'playlist' },
        { icon: 'post_add', label: 'Posts', route: 'posts' }
      ]
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
