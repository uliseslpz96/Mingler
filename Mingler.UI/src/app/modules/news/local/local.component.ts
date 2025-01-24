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
import { NzImageModule } from 'ng-zorro-antd/image';

import { FormatNumberKPipe } from '../../../shared/pipes/format-number-k.pipe';
import { FormatNumberKDecimalPipe } from '../../../shared/pipes/format-number-kdecimal.pipe';

interface Comment {
	author: string;
	datetime: string;
	avatar: string;
	contentText: string;
	contentImage: string[];
	likes: number;
	mehs: number;
	dislikes: number;
	shareds: number;
	comments: number;
}

@Component({
	selector: 'app-local',
	standalone: true,
	imports: [
		CommonModule,
		FormatNumberKPipe,
		FormatNumberKDecimalPipe,
		NzCommentModule,
		NzAvatarModule,
		NzIconModule,
		NzToolTipModule,
		NzListModule,
		NzSpaceModule,
		NzCardModule,
		NzImageModule
	],
	templateUrl: './local.component.html',
	styleUrl: './local.component.css'
})
export class LocalComponent {
	comments: Comment[] = [];
	fallback = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==';

	constructor() {
		// Tu variable actual
		let todayNow = new Date();

		// Crear una nueva fecha y restar 5 minutos
		let fecha5Minutos = new Date(todayNow.getTime());
		fecha5Minutos.setMinutes(fecha5Minutos.getMinutes() - 5);

		// Crear una nueva fecha y restar 17 minutos
		let fecha11Minutos = new Date(todayNow.getTime());
		fecha11Minutos.setMinutes(fecha11Minutos.getMinutes() - 11);

		// Crear una nueva fecha y restar 17 minutos
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

		// Crea una nueva fecha y resta 2 días
		let fechaAntier = new Date(todayNow.getTime());
		fechaAntier.setDate(fechaAntier.getDate() - 2);

		this.comments.push(
			{
				author: '@usertest1',
				datetime: formatDistance(new Date(), new Date()),
				avatar: '',
				contentText: 'yo yendo por tacos',
				contentImage: [
					'https://mir-s3-cdn-cf.behance.net/project_modules/hd/5eeea355389655.59822ff824b72.gif'
				],
				likes: 965,
				mehs: 10,
				dislikes: 8,
				shareds: 410,
				comments: 55
			},
			{
				author: '@claudia.lopez03',
				datetime: formatDistance(new Date(), fecha5Minutos),
				avatar:
					'https://scontent.fgdl2-3.fna.fbcdn.net/v/t39.30808-1/467717892_2346851018992698_348530195723435345_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGsKWnFhJ5KHjJvve7kxhbjZPYza_8_hAZk9jNr_z-EBtvSfCgpPpXt0fE5Tz96IjMxoTngYCJTUIE3IC_fOHI2&_nc_ohc=G97qEcbYEJEQ7kNvgHl0Kf_&_nc_zt=24&_nc_ht=scontent.fgdl2-3.fna&_nc_gid=ABuJ6a2w9w1uiIaXBSLgmvA&oh=00_AYBb6tP8HfdAQPHLmFHRyy8uR4JXA0MXAsWU7mkXN0V_-g&oe=679430B2',
				contentText: '☀️🌿',
				contentImage: [
					'https://scontent.fgdl2-3.fna.fbcdn.net/v/t39.30808-6/337498554_704564364743225_1411420715535586138_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHaMLSE6pfh86Uyzg5Z9NYXcPxTJCwd8Lxw_FMkLB3wvJHNGDioIT85vrMabR0RVauzFC-C01QpgiX_EfL8RaKK&_nc_ohc=fKJlF4gAZiwQ7kNvgEdmNT-&_nc_zt=23&_nc_ht=scontent.fgdl2-3.fna&_nc_gid=AeNy2HTwa22yvZoZE7yXdYE&oh=00_AYB-w182sxb_WzpOEV0ffUTwvzGYnc147nerBLdhlXAQWg&oe=679430BD',
					'https://scontent.fgdl2-1.fna.fbcdn.net/v/t39.30808-6/337986941_6800626609951779_7599582758520882751_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGyJvcm1dOeLksQRSbLw8BQFgPw6uJW4wQWA_Dq4lbjBM_0C6c91mNCz8ZDQIvZwjHamslyqn4cyC9ej0bFOM8x&_nc_ohc=vLHSIDkzREIQ7kNvgGVWuOs&_nc_zt=23&_nc_ht=scontent.fgdl2-1.fna&_nc_gid=AqWkM06rSuFGMwB2_3hE0X-&oh=00_AYDsz8EAbR7K6NinIJd9fNVaQCRtXSKWOjmi5VQVGn4L-g&oe=6794385E',
					'https://scontent.fgdl2-3.fna.fbcdn.net/v/t39.30808-6/338406414_1282796125636621_6391570926278878196_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGhuISy4xrXyhyHumA-jeu3mhq6J0qklA2aGronSqSUDVtnDjsto_7QoZ9wWPL2tqX9Zl_XkmGbZ-V_tqUg_S4D&_nc_ohc=IqxSuWJlJBQQ7kNvgGRVONc&_nc_zt=23&_nc_ht=scontent.fgdl2-3.fna&_nc_gid=AynLabLCi8-viz6KbbjIChz&oh=00_AYBpBEHSBbPIQdj1ukhGLhW6GuSLGcgNGBv0f1C9wfV02w&oe=679434C2'
				],
				likes: 79131,
				mehs: 10896,
				dislikes: 10905,
				shareds: 19990,
				comments: 44899
			},
			{
				author: '@anon1445',
				datetime: formatDistance(new Date(), fecha11Minutos),
				avatar: '',
				contentText: 'aquí les dejo por si tienen frío, de nada 😌',
				contentImage: [ 'https://i.pinimg.com/originals/90/0b/e6/900be635a7e0d8830a9280f36c2a8078.gif' ],
				likes: 59851,
				mehs: 20796,
				dislikes: 19005,
				shareds: 10990,
				comments: 32899
			},
			{
				author: '@robertolopez',
				datetime: formatDistance(new Date(), fecha17Minutos),
				avatar:
					'https://scontent.fgdl2-3.fna.fbcdn.net/v/t39.30808-6/465153212_8759850254077380_2053354214859744270_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHFQziMD4BLG-r-ob9rRufeWOlqHXDequhY6WodcN6q6FSbf1oMpIKSMxH_YHFMB25ko2IPBsh3b6PJIOxWBl_w&_nc_ohc=jDj_YptSckYQ7kNvgFNxXsa&_nc_zt=23&_nc_ht=scontent.fgdl2-3.fna&_nc_gid=AaaGQ901L8Zt7FZancQ9O8k&oh=00_AYBMM-XnIkbONENpu86HbFlrXQS0dvE-q81nMAqud-8m_Q&oe=6791B9B9',
				contentText:
					'Busco sonso que haya comprado proteína para este año y ya no va ir al gym pa comprársela en 100 varos',
				contentImage: [
					'https://corponutrition.com/cdn/shop/products/MGN_Whey-Protein_Vainilla_optimized.jpg?v=1669766672'
				],
				likes: 33998,
				mehs: 1993,
				dislikes: 981,
				shareds: 5455,
				comments: 1995
			},
			{
				author: '@tupapiriqui',
				datetime: formatDistance(new Date(), fecha30Minutos),
				avatar:
					'https://scontent.fgdl2-3.fna.fbcdn.net/v/t39.30808-6/464087711_1238598037291748_1410544472027502685_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF8Y5eDxYMG-ZLmqTKiBXKg3q4B1DwEF5nergHUPAQXmUKt2kR5Zv-2RKQoUJ_jJBJnBXVVm0Fxss0sRKkqzhXx&_nc_ohc=G6oYGY2rnfoQ7kNvgEBCTaJ&_nc_zt=23&_nc_ht=scontent.fgdl2-3.fna&_nc_gid=A2f1rsj9QZl0fo2rzXw-Zw3&oh=00_AYCwJRtt0E4yEUlHn1qhlv9mR1UkOK1sWgR0QZuaYYNK0g&oe=6791FE8E',
				contentText: 'Ese pringaooo!',
				contentImage: [],
				likes: 10105,
				mehs: 2490,
				dislikes: 1050,
				shareds: 759,
				comments: 598
			},
			{
				author: '@antonio_fdz1606',
				datetime: formatDistance(new Date(), fecha1Hora),
				avatar:
					'https://scontent.fgdl2-2.fna.fbcdn.net/v/t39.30808-6/440946068_1208082356847052_5489705930239797780_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEsAz5581XHOmsUPIp68LenQm1cOUquoFtCbVw5Sq6gWxkC3oahCzwVjcz0HS2cKHqMQWF3_GP4qeU3LtukAlxC&_nc_ohc=6Im1sO48olQQ7kNvgGtDkPf&_nc_zt=23&_nc_ht=scontent.fgdl2-2.fna&_nc_gid=AE2oIF4Aw-et3DZKwaJqivL&oh=00_AYDDrMmo6buCJLWW_wZSCn6O-8i8ntrf5q8Ce4opyJSK7w&oe=67922848',
				contentText: '🅿🆅🆃🅾 ​ 🅴🅻 ​ 🆀🆄🅴 ​ 🅻🅾 ​ 🅻🅴🅰 🤙',
				contentImage: [],
				likes: 8785,
				mehs: 1509,
				dislikes: 1009,
				shareds: 3594,
				comments: 2974
			},
			{
				author: '@luisgro.ibarra',
				datetime: formatDistance(new Date(), fecha7Horas),
				avatar:
					'https://scontent.fgdl2-1.fna.fbcdn.net/v/t39.30808-6/449684274_2417858315085646_752005001440526361_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGzziJqvsx6TF42n18B1OwYluwOEYswNEeW7A4RizA0R4bIdn5Qxp5LR9TFePaLHeUQS6Jj5yFo5O5AfV_xG2XT&_nc_ohc=wbp49MI3TK8Q7kNvgE38xZW&_nc_zt=23&_nc_ht=scontent.fgdl2-1.fna&_nc_gid=A_TI44TlknJSNQL3ZwYPL5G&oh=00_AYCTMNerKqOqWTwboXJilJi1mWI4WlAj6EmBkEABSJ4hGQ&oe=67921B90',
				contentText: 'El de arriba me la pela 🙊',
				contentImage: [],
				likes: 80795,
				mehs: 1595,
				dislikes: 979,
				shareds: 374,
				comments: 218
			},
			{
				author: '@iamlomau',
				datetime: formatDistance(new Date(), fechaAyer),
				avatar:
					'https://scontent.fgdl2-2.fna.fbcdn.net/v/t39.30808-6/450969336_7720661754654658_1115951407307896699_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHsRkEuuCrSAAyAdmZ8LVy4M1TuEbp5iGszVO4RunmIa4CMyF2tmEpqN0m8G6VFtL3Lv7IdJOv5k-rQOqFmYrpS&_nc_ohc=2LJnO36_XxoQ7kNvgEr6QLB&_nc_zt=23&_nc_ht=scontent.fgdl2-2.fna&_nc_gid=A-nwaUAfH_P_bWTQfQEv1GH&oh=00_AYDboXU3ZOjcSkBFGBR0J1revkmaw0ayNaCeA1wqJnvl4Q&oe=67920534',
				contentText: 'Perdón las molestias... sigue en desarrollo 😅',
				contentImage: [
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGrcm_S5zxSjrZ02xc9Vfdu4kXivX4wGEXFA&s'
				],
				likes: 141350,
				mehs: 830951,
				dislikes: 780758,
				shareds: 108907,
				comments: 110057
			},
			{
				author: '@anngellongoria',
				datetime: formatDistance(new Date(), fechaAntier),
				avatar:
					'https://scontent.fgdl2-1.fna.fbcdn.net/v/t39.30808-6/460291770_1039504954843517_6301815108278014431_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEfPTGZP6l3TPoCbdBma07FARKUN5a64a0BEpQ3lrrhrWOZl1i0T5HMAbgFCOwDpptDuWwZGWW6MtI5T4jvo0N-&_nc_ohc=s8kTRS2ljnUQ7kNvgE_Poyu&_nc_zt=23&_nc_ht=scontent.fgdl2-1.fna&_nc_gid=A0maesuspkMEArfWd_Q50zw&oh=00_AYB1IsTX1Y0QyrMXCo-zW9Jank7zHM8FN3FPiO9TrZ3CYQ&oe=6791AF5C',
				contentText:
					'Primer publicación probando esta cosa extraña que aun no sé bien cómo funciona... creo que no sirve por lo menos no muy bien aun 😬 mientras miren dónde estoy 😎',
				contentImage: [
					'https://scontent.fgdl2-2.fna.fbcdn.net/v/t1.6435-9/109853379_10223860021548132_1497104311959985383_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=bd9a62&_nc_eui2=AeHsjdV7JtA2OQfEf8k6sKCwgJwWhpl39BuAnBaGmXf0Gw27Q79YQ-LFAYP56en8YafeHk0h8eP1C12BhbrBaXyf&_nc_ohc=8AnT4sg15dAQ7kNvgFAz9lm&_nc_zt=23&_nc_ht=scontent.fgdl2-2.fna&_nc_gid=A5dFxmmrqi0Kutw-jxxP_iv&oh=00_AYDqZY2jkUJFwFnNWbU1T-aIW5yMc5ozwvGcneLXBmgrrg&oe=67B4FAE6',
					'https://scontent.fgdl2-3.fna.fbcdn.net/v/t1.6435-9/107989677_10163802395650440_8968749814180834902_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=bd9a62&_nc_eui2=AeGxvRpwfpN83Gh4PdRhB8jJ66xSUjRJ0J3rrFJSNEnQnTWW9Yt3_Ro9dgN2VMegicIWzI_wiX6stszf0V9y9uV7&_nc_ohc=oHiu3pZiX30Q7kNvgEOc40B&_nc_zt=23&_nc_ht=scontent.fgdl2-3.fna&_nc_gid=A905cQR6azfWRaLaJyloQs1&oh=00_AYCtSj_X9CGYaJKS-11lNR2Er6aaN1YO6rYUp3LRfi9e1g&oe=67B504F5'
				],
				likes: 59851,
				mehs: 20796,
				dislikes: 19005,
				shareds: 10990,
				comments: 32899
			}
		);
	}

	like(comment: Comment): void {
		comment.likes += 6;
	}

	meh(comment: Comment): void {
		comment.mehs += 1;
	}

	dislike(comment: Comment): void {
		comment.dislikes += 2;
	}

	shared(comment: Comment): void {
		comment.shareds += 3;
	}

	comment(comment: Comment): void {
		comment.comments += 4;
	}
}
