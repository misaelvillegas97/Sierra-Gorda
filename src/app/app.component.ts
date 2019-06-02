import { Component } from '@angular/core';
import { Router, NavigationStart, Event, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sierra-Gorda';

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
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
