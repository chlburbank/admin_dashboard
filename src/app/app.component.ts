import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { CustomSidenavComponent } from "./components/custom-sidenav/custom-sidenav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent, CustomSidenavComponent],
  template: `
    <mat-toolbar class="mat-elevation-z3 custom-toolbar">
    <button mat-icon-button (click)="collapsed.set(!collapsed())">
      <mat-icon>menu</mat-icon>
    </button>
  </mat-toolbar>
  <mat-sidenav-container>
    <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
      <app-custom-sidenav [collapsed]="collapsed()"></app-custom-sidenav>
    </mat-sidenav>
    <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
      <router-outlet></router-outlet>
    </mat-sidenav-content>
  </mat-sidenav-container>
    
  `,
  styles: [`
    mat-toolbar {
      position: relative;
      z-index:5;
    }
    .content {
      margin-left: 24px;
    }

    mat-sidenav-container {
      height: calc(100vh - 64px);
    }

    mat-sidenav, mat-sidenav-content {
      transition: all 500ms ease-in-out;
}

    `],
})
export class AppComponent {
  title = 'admin_dashboard';

  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');
}
