import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatNumberK',
	standalone: true
})
export class FormatNumberKPipe implements PipeTransform {
	transform(value: number): string {
		return value.toLocaleString();
	}
}
