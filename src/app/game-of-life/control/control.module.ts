import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ControlComponent } from "./control.component";

@NgModule({
  declarations: [ControlComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
    MatSelectModule,
  ],
  exports: [
    ControlComponent
  ]
})
export class ControlModule {

}
