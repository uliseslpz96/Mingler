import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatDistance } from 'date-fns';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';

interface Comment {
	author: string;
	datetime: string;
	avatar: string;
	content: string;
	likes: number;
	mehs: number;
	dislikes: number;
	shareds: number;
}

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		CommonModule,
		NzCommentModule,
		NzAvatarModule,
		NzIconModule,
		NzToolTipModule,
		NzListModule,
		NzSpaceModule,
		NzCardModule
	],
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent {
	comments: Comment[] = [];

	constructor() {
		// Tu variable actual
		let todayNow = new Date();

        // Crear una nueva fecha y restar 30 minutos
		let fecha17Minutos = new Date(todayNow.getTime());
		fecha17Minutos.setMinutes(fecha17Minutos.getMinutes() - 17);

		// Crear una nueva fecha y restar 30 minutos
		let fecha30Minutos = new Date(todayNow.getTime());
		fecha30Minutos.setMinutes(fecha30Minutos.getMinutes() - 30);

		// Crear una nueva fecha y restar 1 hora
		let fecha1Hora = new Date(todayNow.getTime());
		fecha1Hora.setHours(fecha1Hora.getHours() - 1);

		// Crear una nueva fecha y restar 7 horas
		let fecha7Horas = new Date(todayNow.getTime());
		fecha7Horas.setHours(fecha7Horas.getHours() - 7);

		// Crear una nueva fecha y restar 1 día
		let fechaAyer = new Date(todayNow.getTime());
		fechaAyer.setDate(fechaAyer.getDate() - 1);

		this.comments.push(
			{
				author: '@anngellongoria',
				datetime: formatDistance(new Date(), new Date()),
				avatar:
					'https://scontent.fgdl2-1.fna.fbcdn.net/v/t39.30808-6/460291770_1039504954843517_6301815108278014431_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEfPTGZP6l3TPoCbdBma07FARKUN5a64a0BEpQ3lrrhrWOZl1i0T5HMAbgFCOwDpptDuWwZGWW6MtI5T4jvo0N-&_nc_ohc=s8kTRS2ljnUQ7kNvgE_Poyu&_nc_zt=23&_nc_ht=scontent.fgdl2-1.fna&_nc_gid=A0maesuspkMEArfWd_Q50zw&oh=00_AYB1IsTX1Y0QyrMXCo-zW9Jank7zHM8FN3FPiO9TrZ3CYQ&oe=6791AF5C',
				content:
					'Primer publicación probando esta cosa extraña que aun no sé bien cómo funciona... creo que no sirve por lo menos no muy bien aun :D',
				likes: 55,
				mehs: 2,
				dislikes: 0,
				shareds: 100
			},
			{
				author: '@robertolopez',
				datetime: formatDistance(new Date(), fecha17Minutos),
				avatar:
					'https://scontent.fgdl2-3.fna.fbcdn.net/v/t39.30808-6/465153212_8759850254077380_2053354214859744270_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHFQziMD4BLG-r-ob9rRufeWOlqHXDequhY6WodcN6q6FSbf1oMpIKSMxH_YHFMB25ko2IPBsh3b6PJIOxWBl_w&_nc_ohc=jDj_YptSckYQ7kNvgFNxXsa&_nc_zt=23&_nc_ht=scontent.fgdl2-3.fna&_nc_gid=AaaGQ901L8Zt7FZancQ9O8k&oh=00_AYBMM-XnIkbONENpu86HbFlrXQS0dvE-q81nMAqud-8m_Q&oe=6791B9B9',
				content:
					'Busco sonso que haya comprado proteína para este año y ya no va ir al gym pa comprársela en 100 varos',
				likes: 33,
				mehs: 3,
				dislikes: 1,
				shareds: 55
			},
			{
				author: '@tupapiriqui',
				datetime: formatDistance(new Date(), fecha30Minutos),
				avatar:
					'https://scontent.fgdl2-3.fna.fbcdn.net/v/t39.30808-6/464087711_1238598037291748_1410544472027502685_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF8Y5eDxYMG-ZLmqTKiBXKg3q4B1DwEF5nergHUPAQXmUKt2kR5Zv-2RKQoUJ_jJBJnBXVVm0Fxss0sRKkqzhXx&_nc_ohc=G6oYGY2rnfoQ7kNvgEBCTaJ&_nc_zt=23&_nc_ht=scontent.fgdl2-3.fna&_nc_gid=A2f1rsj9QZl0fo2rzXw-Zw3&oh=00_AYCwJRtt0E4yEUlHn1qhlv9mR1UkOK1sWgR0QZuaYYNK0g&oe=6791FE8E',
				content: 'Ese pringaooo!',
				likes: 101,
				mehs: 24,
				dislikes: 10,
				shareds: 75
			},
			{
				author: '@antonio_fdz1606',
				datetime: formatDistance(new Date(), fecha1Hora),
				avatar:
					'https://scontent.fgdl2-2.fna.fbcdn.net/v/t39.30808-6/440946068_1208082356847052_5489705930239797780_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEsAz5581XHOmsUPIp68LenQm1cOUquoFtCbVw5Sq6gWxkC3oahCzwVjcz0HS2cKHqMQWF3_GP4qeU3LtukAlxC&_nc_ohc=6Im1sO48olQQ7kNvgGtDkPf&_nc_zt=23&_nc_ht=scontent.fgdl2-2.fna&_nc_gid=AE2oIF4Aw-et3DZKwaJqivL&oh=00_AYDDrMmo6buCJLWW_wZSCn6O-8i8ntrf5q8Ce4opyJSK7w&oe=67922848',
				content: 'pvto el que lo lea 🤙',
				likes: 85,
				mehs: 15,
				dislikes: 9,
				shareds: 34
			},
			{
				author: '@luisgro.ibarra',
				datetime: formatDistance(new Date(), fecha7Horas),
				avatar:
					'https://scontent.fgdl2-1.fna.fbcdn.net/v/t39.30808-6/449684274_2417858315085646_752005001440526361_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGzziJqvsx6TF42n18B1OwYluwOEYswNEeW7A4RizA0R4bIdn5Qxp5LR9TFePaLHeUQS6Jj5yFo5O5AfV_xG2XT&_nc_ohc=wbp49MI3TK8Q7kNvgE38xZW&_nc_zt=23&_nc_ht=scontent.fgdl2-1.fna&_nc_gid=A_TI44TlknJSNQL3ZwYPL5G&oh=00_AYCTMNerKqOqWTwboXJilJi1mWI4WlAj6EmBkEABSJ4hGQ&oe=67921B90',
				content: 'El de arriba me la pela 🙊',
				likes: 85,
				mehs: 15,
				dislikes: 9,
				shareds: 34
			},
            {
				author: '@iamlomau',
				datetime: formatDistance(new Date(), fechaAyer),
				avatar:
					'https://scontent.fgdl2-2.fna.fbcdn.net/v/t39.30808-6/450969336_7720661754654658_1115951407307896699_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHsRkEuuCrSAAyAdmZ8LVy4M1TuEbp5iGszVO4RunmIa4CMyF2tmEpqN0m8G6VFtL3Lv7IdJOv5k-rQOqFmYrpS&_nc_ohc=2LJnO36_XxoQ7kNvgEr6QLB&_nc_zt=23&_nc_ht=scontent.fgdl2-2.fna&_nc_gid=A-nwaUAfH_P_bWTQfQEv1GH&oh=00_AYDboXU3ZOjcSkBFGBR0J1revkmaw0ayNaCeA1wqJnvl4Q&oe=67920534',
				content: 'Perdón las molestias... sigue en desarrollo 😅',
				likes: 11350,
				mehs: 8951,
				dislikes: 7758,
				shareds: 10897
			}
		);
	}

	like(comment: Comment): void {
		comment.likes += 1;
		comment.mehs = 0;
		comment.dislikes = 0;
	}

	meh(comment: Comment): void {
		comment.likes = 0;
		comment.mehs += 1;
		comment.dislikes = 0;
	}

	dislike(comment: Comment): void {
		comment.likes = 0;
		comment.mehs = 0;
		comment.dislikes += 1;
	}

	shareds(comment: Comment): void {
		comment.shareds += 1;
	}
}
