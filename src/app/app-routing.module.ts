import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDetailsComponent } from './components/add-details/add-details.component';
import { LandingComponent } from './components/landing/landing.component';
import { SearchComponent } from './components/search/search.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full',
  },
  {
    path: 'add-sales',
    component: AddDetailsComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'details/:sales_id/:customer_id',
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
