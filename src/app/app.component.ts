import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './user/user.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  private activatedSub: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe(value => {
      this.userActivated = value;
    })
  }
// коли використовуємо Subject, маємо відписатись
  ngOnDestroy(): void {
    this.activatedSub.unsubscribe()
  }
}
