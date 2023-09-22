import { Pipe, PipeTransform } from '@angular/core';
import { livingCellCount } from '../game/logic';
import { World } from '../model/game-of-life.model';

@Pipe({
    name: 'livingCellCount',
  standalone: true
})
export class LivingCellCountPipe implements PipeTransform {
    transform(world: World | null): number {
        if (!world) {
            return 0;
        }
        return livingCellCount(world.cells);
    }
}
