import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toId',
    standalone: true
})
export class ToIdPipe implements PipeTransform {

    transform(value: string): string {
        return value.replace(/[,.\s]/g, '-');
    }

}
