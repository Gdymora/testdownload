import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DownloadComponent } from './components/form/download/download.component';
import { UserComponent } from './components/form/user/user.component';
import { UserCreateComponent } from './components/form/user-create/user-create.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UserSearchComponent } from './components/user-search/user-search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'user-search', component: UserSearchComponent },
  { path: '**', redirectTo: '/' }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
