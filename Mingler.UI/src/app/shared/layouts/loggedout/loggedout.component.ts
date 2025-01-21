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
	menuItems: MenuItem[] = [
		{
			title: 'Local',
			children: [
				{ title: 'Cerca de mi', icon: 'environment', disabled: false, select: true },
				{ title: 'Personalizar', icon: 'filter', disabled: false }
			]
		},
		{
			title: 'Visita',
			children: [
				{ title: 'Región', icon: 'aim', disabled: false },
				{ title: 'Pais', icon: 'global', disabled: true }
			]
		},
		{ title: 'Seguidores', icon: 'team', disabled: false }
	];

	locationTitle: string = '';
	locationOption: string = '';
	size: number = 20;
	notificationCount: number = 5;
	messageCount: number = 3;

	constructor() {
		this.menuItems.forEach((group) => {
			if (group.children) {
				group.children.forEach((item) => {
					if (item.select) {
						this.locationTitle = group.title;
						this.locationOption = '|  ' + item.title;
					}
				});
			}
		});
	}

	onMenuItemClick(menuGroup: MenuItem, menuItem: MenuItem): void {

		if(menuItem.disabled)
			return;

		this.locationTitle = menuGroup.title;
		this.locationOption = '|  ' + menuItem.title;

		if (menuGroup.title == menuItem.title) this.locationOption = '';
	}
}
