import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessListPage } from './process-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessListPageRoutingModule {}
