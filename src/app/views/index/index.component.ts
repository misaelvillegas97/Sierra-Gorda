import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';

declare var jsCalendar: any;
const dayname = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

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
  title_hovered: boolean = true;

  // Estado de usuario
  logged: boolean = true;

  // Single chat state
  chatSelected = false;
  userID: number;

  constructor() {
    this.dayselected = new Date().getDate();
    this.daynameselected = dayname[(new Date().getDay())];
  }

  ngOnInit() {
    this.jsCalendarLoader();
  }

  //#region Calendar
    jsCalendarLoader() {
      let calendar = new jsCalendar();
      var element = document.getElementById('my-calendar');
      // Create the calendar
      let activeCalendar = jsCalendar.new(element, new Date(), {
        language: 'es',
        firstDayOfTheWeek: 2,
        monthFormat: 'MONTH',
        navigator: false

      });

      // Update view
      activeCalendar.onDateClick(
        (event, date: Date) => {
          this.dayselected = date.getDate();
          console.log(date.getDay());
          this.daynameselected = dayname[date.getDay()];
        }
      );
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

    getUVColor(value: number): String {
      if (value === 1) { return '#6BC04A'; }
      if (value === 2) { return '#6BC04A'; }
      if (value === 3) { return '#FEC700'; }
      if (value === 4) { return '#F32634'; }
      if (value === 5) { return '#9F28B5'; }
    }
  //#endregion UV filter module

  //#region CHAT
    toggle_chat(state: boolean) {
      if (state) {
        // document.getElementById('chat-container').style.visibility = 'visible';
        document.getElementById('chat-container').style.display = 'block';
      } else {
        // document.getElementById('chat-container').style.visibility = 'hidden';
        document.getElementById('chat-container').style.display = 'none';
        this.chatSelected = false;
        this.userID = undefined;
      }

      return false;
    }


    loadSelectedChat( data: any ) {
      // console.log(data);
      // console.log(this.chatSelected);
      this.userID = data;
      this.chatSelected = true;
    }
  //#endregion CHAT

  //#region Encuestas
    toggle_poll(state: boolean) {
      if (state) {
        document.getElementById('poll-container').style.display = 'block';
      } else {
        document.getElementById('poll-container').style.display = 'none';
      }

      return false;
    }
  //#endregion

  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === 27) {
      this.toggle_chat(false);
      this.toggle_poll(false);
    }
  }
}
