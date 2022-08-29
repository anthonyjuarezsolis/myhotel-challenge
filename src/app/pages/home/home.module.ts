import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { MyHotelCommonsModule } from "src/app/commons/commons.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [MyHotelCommonsModule, HomeRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
