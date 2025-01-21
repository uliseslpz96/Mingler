import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatNumberKDecimal',
	standalone: true
})
export class FormatNumberKDecimalPipe implements PipeTransform {
	transform(value: number): string {
		if (value >= 1000000) {
			return `+${Math.floor(value / 1000000)}M`;
		} else if (value >= 10000) {
			return `+${Math.floor(value / 1000)}k`;
		} else if (value >= 1000) {
			return `+${(value / 1000).toFixed(1)}k`;
		}
		return value.toString();
	}
}
