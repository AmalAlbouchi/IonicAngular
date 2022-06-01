import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessListPageRoutingModule } from './process-list-routing.module';

import { ProcessListPage } from './process-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcessListPageRoutingModule
  ],
  declarations: [ProcessListPage]
})
export class ProcessListPageModule {}
