import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener
} from '@angular/core';
import { SinglechatComponent } from '../chat/messages/singlechat/singlechat.component';

declare var jsCalendar: any;
const dayname = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado'
];

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  // Calendario
  dayselected: number;
  daynameselected: string;
  monthselected: string;

  // Filtro UV
  uvactual = 3;
  uv_actual: any;
  filtermain: string;
  title_hovered = true;

  // Estado de usuario
  logged = true;

  // Single chat state
  chatSelected = false;
  userID: number = undefined;

  // Single poll state
  pollSelected = false;
  pollID: number = undefined;

  constructor() {
    this.dayselected = new Date().getDate();
    this.daynameselected = dayname[new Date().getDay()];
  }

  ngOnInit() {
    this.jsCalendarLoader();
  }

  //#region Calendar
  jsCalendarLoader() {
    // let calendar = new jsCalendar();
    const element = document.getElementById('my-calendar');
    // Create the calendar
    const activeCalendar = jsCalendar.new(element, new Date(), {
      language: 'es',
      firstDayOfTheWeek: 2,
      monthFormat: 'MONTH',
      navigator: false
    });

    // Update view
    activeCalendar.onDateClick((event, date: Date) => {
      this.dayselected = date.getDate();
      console.log(date.getDay());
      this.daynameselected = dayname[date.getDay()];
    });
  }
  //#endregion

  //#region UV filter module
  // Toggle Hidden Filter Box
  toggle_filtro_uv(state: boolean) {
    if (state) {
      this.title_hovered = false;
      document.getElementById('filter-button').style.height = '500px';
      document.getElementById('filter-content').style.visibility = 'visible';
    } else {
      document.getElementById('filter-button').style.height = '50px';
      document.getElementById('filter-content').style.visibility = 'collapse';
      this.title_hovered = true;
    }
  }

  getUVColor(value: number): string {
    if (value === 1) {
      return '#6BC04A';
    }
    if (value === 2) {
      return '#6BC04A';
    }
    if (value === 3) {
      return '#FEC700';
    }
    if (value === 4) {
      return '#F32634';
    }
    if (value === 5) {
      return '#9F28B5';
    }
  }
  //#endregion UV filter module

  //#region Chat
    toggle_chat(state: boolean) {
      if (state) {
        document.getElementById('chat-container').style.display = 'block';
      } else {
        document.getElementById('chat-container').classList.remove('fadeInRightBig');
        document.getElementById('chat-container').classList.add('fadeOutRightBig');
        setTimeout(() => {
          document.getElementById('chat-container').style.display = 'none';

          document.getElementById('chat-container').classList.remove('fadeOutRightBig');
          document.getElementById('chat-container').classList.add('fadeInRightBig');
        }, 500);
        if (this.userID != undefined ) {
          document.getElementById(`user-${this.userID}`).classList.remove('active');
        }
        this.chatSelected = false;
        this.userID = undefined;
      }
      return false;
    }

    loadSelectedChat(data: any): void {
      if (data !== this.userID) {
        if (this.userID !== undefined) {
          document.getElementById(`user-${this.userID}`).classList.remove('active');
          this.chatSelected = false;
          this.userID = undefined;
        }
        this.userID = data;
        this.chatSelected = true;
        document.getElementById(`user-${this.userID}`).classList.add('active');

      } else {
        document.getElementById(`user-${this.userID}`).classList.remove('active');
        this.chatSelected = false;
        this.userID = undefined;
      }
    }
  //#endregion Chat

  //#region Encuestas
    toggle_poll(state: boolean) {
      if (state) {
        document.getElementById('poll-container').style.display = 'block';
      } else {
        document.getElementById('poll-container').classList.remove('fadeInLeftBig');
        document.getElementById('poll-container').classList.add('fadeOutLeftBig');
        setTimeout(() => {
          document.getElementById('poll-container').style.display = 'none';

          document.getElementById('poll-container').classList.remove('fadeOutLeftBig');
          document.getElementById('poll-container').classList.add('fadeInLeftBig');
        }, 500);
        this.pollSelected = false;
        this.pollID = undefined;
      }

      return false;
    }

    toggle_poll_sidebar(state: boolean) {
      if (!state) {
        document.getElementById('poll-container').style.display = 'none';
      }
    }

    loadSelectedPoll(id: any): void {
      // select
      this.pollID = id;
      this.pollSelected = true;
    }
  //#endregion

  //#region Contactos
    toggle_contact(state: boolean) {
      if (state) {
        document.getElementById('contact-container').style.display = 'block';
      } else {
        document.getElementById('contact-container').classList.remove('fadeInRightBig');
        document.getElementById('contact-container').classList.add('fadeOutRightBig');
        setTimeout(() => {
          document.getElementById('contact-container').style.display = 'none';

          document.getElementById('contact-container').classList.remove('fadeOutRightBig');
          document.getElementById('contact-container').classList.add('fadeInRightBig');
        }, 500);
        this.pollSelected = false;
        this.pollID = undefined;
      }

      return false;
    }
  //#endregion Contactos

  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    // console.log(event);

    if (event.keyCode === 27) {
      this.toggle_chat(false);
      this.toggle_poll(false);
    }
  }
}
