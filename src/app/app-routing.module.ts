import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then(
        (m: any) => m.AuthModule
      ),
  },
  {
    canActivate: [AuthGuard] ,
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m: any) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
