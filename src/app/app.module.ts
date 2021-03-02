import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { reducers, metaReducers } from './app-state';
import { EffectsModule } from '@ngrx/effects';
import { VodEffects } from './app-state/effects/vod.effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VodListPageComponent } from './pages/vod-list-page/vod-list-page.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { ImgErrorCatchDirective } from './directives/img-error-catch.directive';
import { FormsModule } from '@angular/forms';
import { FocusOnInitDirective } from './directives/focus-on-init.directive';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { SearchLayoutComponent } from './layouts/search-layout/search-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VodListPageComponent,
    SearchbarComponent,
    FormatDatePipe,
    ImgErrorCatchDirective,
    FocusOnInitDirective,
    ItemPageComponent,
    SearchLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([VodEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
