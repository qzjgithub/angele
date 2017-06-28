import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LocalProComponent } from './local-pro/local-pro.component';
import {Routes, RouterModule} from "@angular/router";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { TreeComponent } from './tree/tree.component';
import { TreenodeComponent } from './tree/treenode/treenode.component';
import { PositionComponent } from './position/position.component';
import { ProjectComponent } from './project/project.component';
import { ComFrameComponent } from './component/com-frame/com-frame.component';
import { InputComponent } from './component/input/input.component';
import { LocalProItemComponent } from './local-pro/local-pro-item/local-pro-item.component';
import {appStoreProviders} from "../control/app.store";
import {PROJECT_PROVIDERS} from "../control/project/project.service";
import { SelectComponent } from './component/select/select.component';
import { TextareaComponent } from './component/textarea/textarea.component';

const routes: Routes = [
  {path: '', redirectTo: 'localPro',pathMatch: 'full'},
  {path: 'localPro',component: LocalProComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    LocalProComponent,
    TreeComponent,
    TreenodeComponent,
    PositionComponent,
    ProjectComponent,
    ComFrameComponent,
    InputComponent,
    LocalProItemComponent,
    SelectComponent,
    TextareaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    appStoreProviders,
    PROJECT_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
