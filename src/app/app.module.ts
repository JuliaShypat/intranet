import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NewsComponent } from './pages/news/news.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { ToolboxComponent } from './pages/toolbox/toolbox.component';
import { AnnoncementsComponent } from './pages/annoncements/annoncements.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryListComponent } from './pages/toolbox/category-list/category-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/toolbox', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'news', component: NewsComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'toolbox', component: ToolboxComponent },
  { path: 'annoncements', component: AnnoncementsComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NewsComponent,
    DepartmentsComponent,
    ToolboxComponent,
    AnnoncementsComponent,
    AboutComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    CategoryListComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), AngularFontAwesomeModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
