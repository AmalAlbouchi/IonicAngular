import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [LoginGuardService]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'process',
    loadChildren: () => import('./pages/process-list/process-list.module').then( m => m.ProcessListPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'task/:status',
    loadChildren: () => import('./pages/task-list/task-list.module').then( m => m.TaskListPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'process/:id',
    loadChildren: () => import('./pages/process/process.module').then( m => m.ProcessPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'task/:status/:id',
    loadChildren: () => import('./pages/task/task.module').then( m => m.TaskPageModule),
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
