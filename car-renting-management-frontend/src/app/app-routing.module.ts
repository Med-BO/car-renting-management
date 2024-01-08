import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './screens/main-menu/main-menu.component';
import { VoitureManagementComponent } from './screens/voiture-management/voiture-management.component';
import { LocataireManagementComponent } from './screens/locataire-management/locataire-management.component';

const routes: Routes = [
  { path: "main-menu", component: MainMenuComponent },
  { path: "voiture-management", component: VoitureManagementComponent },
  { path: "locataire-management", component: LocataireManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
