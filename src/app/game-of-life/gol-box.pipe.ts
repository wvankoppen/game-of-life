import { Pipe, PipeTransform } from '@angular/core';
import { World } from './game-of-life';

@Pipe({
    name: 'golBox',
})
export class GolBoxPipe implements PipeTransform {
    transform(world: World | null): { width: number; height: number } {
        if (!world) {
            return { width: 0, height: 0 };
        }
        return { width: world.length * 10, height: world[0].length * 10 };
    }
}
