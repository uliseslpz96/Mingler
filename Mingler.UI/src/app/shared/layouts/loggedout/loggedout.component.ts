import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

interface MenuItem {
	title: string;
	icon?: string;
	disabled?: boolean;
	children?: MenuItem[];
	select?: boolean;
}

@Component({
	selector: 'app-loggedout',
	standalone: true,
	imports: [
		RouterOutlet,
		RouterLink,
		CommonModule,
		NzLayoutModule,
		NzIconModule,
		NzMenuModule,
		NzDividerModule,
		NzSpaceModule,
		NzButtonModule,
		NzBadgeModule,
		NzAvatarModule
	],
	templateUrl: './loggedout.component.html',
	styleUrls: [ './loggedout.component.css' ]
})
export class LoggedoutComponentLayout {
	
}
