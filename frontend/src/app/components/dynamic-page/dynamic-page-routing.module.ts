import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicPageComponent } from './dynamic-page.component';

const routes: Routes = [
  {path:"", children: [
    // {path: ":parent", component: DynamicPageComponent},
    // {path: ":parent/:child", component: DynamicPageComponent},
    {path: ":parent/:child/:sub", component: DynamicPageComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicPageRoutingModule { }
