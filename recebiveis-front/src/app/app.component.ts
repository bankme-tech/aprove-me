import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recebiveis-front';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.title = this.getPageTitle(this.activatedRoute);
    });
  }

  private getPageTitle(route: ActivatedRoute): string {
    let pageTitle = '';

    while (route.firstChild) {
      route = route.firstChild;
      console.log(route)
      if (route.snapshot.data && route.snapshot.data['title']) {
        pageTitle = route.snapshot.data['title'];
      }
    }

    return pageTitle;
  }
}
