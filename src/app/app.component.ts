import { Component } from '@angular/core'
import * as Rx from 'rxjs/Rx'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public ObservableList: Rx.Observable<{}>[] = []

    constructor () {
  
    }

  public title: string = "RxJs isn't hard!"

  public createObservable () : void {

    // let source = Rx.Observable.create( ( observer: Rx.Observer<{}> ) => {
    //   observer.next([1,2,3,4])
    //   observer.complete()
    // } )

    let source = Rx.Observable.interval(1000).take(5).map( ( x: any ) => {
      return {id:x}
    })

    this.ObservableList.push( source )
    source = Object.assign(source, {obj: {}, index: this.ObservableList.length, completed: false})

  }

  public triggerObservable ( source: Rx.Subject<{}> ) : void {

    source = Object.assign(source, {obj: {}, index: this.ObservableList.length, completed: false})

    source
      .subscribe(
        ( x: any ) => {
          source = Object.assign(source, {obj: x})
          console.log(x)
        },
        ( x: any ) => {
          console.log(x)
        },
        () => {
          source = Object.assign(source, {completed: true})
          console.log('stream completed!')
        }
      )
  }

  clearList () : void {
    this.ObservableList = []
  }
}