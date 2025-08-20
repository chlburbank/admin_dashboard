import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Widget } from '../../models/dashboard';
import { WidgetComponent } from "../../components/widget/widget.component";
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, WidgetComponent],
  providers: [DashboardService],
  template: `
    <h2>
      Channel Dashboard
    </h2>

    <div class="dashboard-widgets">
      @for (w of store.widgets(); track w.id) {
        
        <app-widget [data]="w"/>

    }

      </div>
  `,
  styles: `
  
  .dashboard-widgets {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }
  
  `
})
export class DashboardComponent {
  store = inject(DashboardService);
}
