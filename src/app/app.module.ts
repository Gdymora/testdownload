import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationComponent } from './components/application/application.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './components/home/home.component';
import { DownloadComponent } from './components/form/download/download.component';
import { UserComponent } from './components/form/user/user.component';
import { UserCreateComponent } from './components/form/user-create/user-create.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UserAllTableComponent } from './components/user-all-table/user-all-table.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { UserSearchService } from './services/data/user-search-service';


@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    DownloadComponent,
    UserComponent,
    UserCreateComponent,
    AdminPanelComponent,
    UserAllTableComponent,
    UserSearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatButtonModule,
   
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [UserSearchService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
