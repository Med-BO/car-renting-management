import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './screens/main-menu/main-menu.component';
import { VoitureManagementComponent } from './screens/voiture-management/voiture-management.component';
import { LocataireManagementComponent } from './screens/locataire-management/locataire-management.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    VoitureManagementComponent,
    LocataireManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
