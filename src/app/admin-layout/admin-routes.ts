import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout.component";
import { HotelListComponent } from "./hotel-list/hotel-list.component";


export const adminRoutes: Routes = [
  { path: '', redirectTo: 'hotels', pathMatch: 'full' },
  {
    path: 'hotels',
    component: HotelListComponent,
  },
]
