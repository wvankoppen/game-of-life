import { Pipe, PipeTransform } from '@angular/core';
import { World } from '../model/game-of-life.model';

@Pipe({
    name: 'iterations',
})
export class IterationsPipe implements PipeTransform {
    transform(world: World | null): number {
        if (!world) {
            return 0;
        }
        return world.iteration;
    }
}
