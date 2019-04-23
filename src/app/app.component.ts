import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sierra-Gorda';

  toggle_chat(state: boolean) {
    // console.log('works');
    if (state) {
      document.getElementById('chat-container').style.visibility = 'visible';
    } else {
      document.getElementById('chat-container').style.visibility = 'hidden';
    }

    return false;
  }
}
