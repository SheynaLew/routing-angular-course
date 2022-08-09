import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;  //Add this variable to allow us to unsubscribe when the component is destroyed

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    // .params is giving us access to the parameters we defined in app.module. In this case, id and name (i.e: users/:id/:name)
    // we can output that data in the HTML as {{ user.name }}
    // snapshot only works if we haven't been on the route before. So if we have a link to a user on the users page, it won't update the HTML to show the new user's name and ID (i.e 10, Anna). Snapshot works for the initial page load, but it is not dynamic enough for this purpose.
      //Instead we can subscribe to params as an observable
        // When params is updated, it nudges user.id and user.name to let them know to change their value
        // See below (pass in params to subscribe so we have access to the updated parameters)

    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    // Need to add unsubscribe to onDestroy as subscriptions live on in memory. So when component is destroyed, it will be unsubscribed.
  }

}
