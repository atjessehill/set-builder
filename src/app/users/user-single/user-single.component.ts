import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.scss']
})
export class UserSingleComponent implements OnInit {
  user;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const username = params['username'];
      this.userService
        .getUser(username)
        .subscribe(user => this.user = user);
    });
  }

}
