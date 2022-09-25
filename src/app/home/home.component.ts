import {Component, OnInit, OnDestroy} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription

  constructor() {
  }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count)
    // })
    const customIntervalObs = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count > 3) {
          observer.error(new Error('Count > 3!'));
        }
        count++
      },1000)
    });

    this.firstObsSubscription = customIntervalObs.subscribe((count) => {
      console.log(count);
    }, error => {
      console.log(error)
      alert(error.message)
    })
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe()
  }
}
