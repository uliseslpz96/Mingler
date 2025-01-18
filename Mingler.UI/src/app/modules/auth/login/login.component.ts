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
  imports: [CommonModule, NzCommentModule, NzAvatarModule, NzIconModule, NzToolTipModule, NzListModule, NzSpaceModule, NzCardModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  comments: Comment[] = Array(9).fill({
    author: '@anngellongoria',
    datetime: formatDistance(new Date(), new Date()),
    avatar: 'https://scontent.fgdl2-1.fna.fbcdn.net/v/t39.30808-6/460291770_1039504954843517_6301815108278014431_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEfPTGZP6l3TPoCbdBma07FARKUN5a64a0BEpQ3lrrhrWOZl1i0T5HMAbgFCOwDpptDuWwZGWW6MtI5T4jvo0N-&_nc_ohc=s8kTRS2ljnUQ7kNvgE_Poyu&_nc_zt=23&_nc_ht=scontent.fgdl2-1.fna&_nc_gid=A0maesuspkMEArfWd_Q50zw&oh=00_AYB1IsTX1Y0QyrMXCo-zW9Jank7zHM8FN3FPiO9TrZ3CYQ&oe=6791AF5C',
    content: 'Primer publicación probando esta cosa extraña que aun no sé bien cómo funciona... creo que no sirve por lo menos no muy bien aun :D',
    likes: 55,
    mehs: 2,
    dislikes: 0
  });

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
