import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { Globals } from './globals';
import { SharedModule } from './shared/shared.module';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HttpLoadingInterceptor } from './core/interceptors/http-loading.interceptor';



@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  declarations: [AppComponent, AuthLayoutComponent, ContentLayoutComponent, ProgressBarComponent],
  bootstrap: [AppComponent],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      },
      { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true }

   ],
})
export class AppModule { }
