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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryListComponent } from './pages/toolbox/category-list/category-list.component';
import { SectionsComponent } from './pages/sections/sections.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const routes: Routes = [
  { path: '', redirectTo: '/toolbox', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'news', component: NewsComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'toolbox', component: ToolboxComponent },
  { path: 'annoncements', component: AnnoncementsComponent },
  { path: 'sections', component: SectionsComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translations/', '.json');
}

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
    CategoryListComponent,
    SectionsComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      defaultLanguage: 'pl',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularFontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
