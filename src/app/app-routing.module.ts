import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchLayoutComponent } from './layouts/search-layout/search-layout.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { VodListPageComponent } from './pages/vod-list-page/vod-list-page.component';

const routes: Routes = [
  {path: 'tag', component: SearchLayoutComponent, children: [
    {path: ':type', component: VodListPageComponent}
  ]},
  {path: 'item/:id', component: ItemPageComponent},
  {path: '**', redirectTo: '/tag'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
