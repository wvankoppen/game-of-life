import { Pipe, PipeTransform } from '@angular/core';
import { hasLife } from '../game/logic';
import { World } from '../model/game-of-life.model';

@Pipe({
    name: 'hasLife',
  standalone: true
})
export class HasLifePipe implements PipeTransform {
    transform(world: World | null): boolean {
        if (!world) {
            return false;
        }
        return hasLife(world.cells);
    }
}
