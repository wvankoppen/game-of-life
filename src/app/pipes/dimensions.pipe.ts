import { Pipe, PipeTransform } from '@angular/core';
import { cols, rows } from '../game/logic';
import { Dimensions, World } from '../model/game-of-life.model';

@Pipe({
    name: 'dimensions',
  standalone: true
})
export class DimensionsPipe implements PipeTransform {
    transform(world: World | null): Dimensions {
        if (!world?.cells) {
            return { rows: 0, cols: 0 };
        }
        return { rows: rows(world.cells), cols: cols(world.cells) };
    }
}
