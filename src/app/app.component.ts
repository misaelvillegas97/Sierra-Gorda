import { Component } from '@angular/core';
import { Router, NavigationStart, Event, NavigationEnd, NavigationError } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Gtag } from 'angular-gtag';

// declare var gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sierra-Gorda';

  constructor(private router: Router, private gtag: Gtag) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        // gtag('config', 'UA-143329686-2', {
        //   page_path: event.urlAfterRedirects
        // });
        gtag.pageview({
          page_title: 'Intranet Sierra Gorda',
          page_path: event.urlAfterRedirects,
        });
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
  }

  toggle_chat(state: boolean) {
    // console.log('works');
    if (state) {
      document.getElementById('chat-container').style.visibility = 'visible';
    } else {
      document.getElementById('chat-container').style.visibility = 'hidden';
    }

    return false;
  }

  subirScroll() {
    setTimeout(() => {
      console.log('Subiendo Scroll');
      window.scrollTo(0, 0);
    }, 500);
  }
}
