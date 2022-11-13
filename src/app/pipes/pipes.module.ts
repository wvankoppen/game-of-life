import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasLifePipe } from './has-life.pipe';
import { IterationsPipe } from './iterations.pipe';
import { DimensionsPipe } from './dimensions.pipe';
import { LivingCellCountPipe } from './living-cell-count.pipe';

@NgModule({
    declarations: [HasLifePipe, IterationsPipe, DimensionsPipe, LivingCellCountPipe],
    imports: [CommonModule],
  exports: [HasLifePipe, IterationsPipe, DimensionsPipe, LivingCellCountPipe],
})
export class PipesModule {}
