import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminTestComponent } from './admin-test/admin-test.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent }
  // { path: '', component: AdminTestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
