import {Component, OnInit, OnDestroy} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {map, filter} from 'rxjs/operators';

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
        if (count === 8) {
          observer.complete()
        }
        if (count > 9) {
          observer.error(new Error('Count > 9!'));
        }
        count++
      }, 1000)
    });

    // customIntervalObs.pipe(map((data) => {
    //   return `Value: ${data}`
    // }));

    this.firstObsSubscription = customIntervalObs.pipe(
      filter(data => {
        return +data % 2 === 0
      }),
      map((data) => {
      return `Round: ${data}`
    })).subscribe((count: string) => {
        console.log(count)
      }, error => {
        console.log(error)
        alert(error.message)
      }, () => {
        console.log('Completed!')
      }
    )
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe()
  }
}
