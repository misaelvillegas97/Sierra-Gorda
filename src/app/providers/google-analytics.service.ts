import { Injectable } from '@angular/core';
import { Gtag } from 'angular-gtag';

// declare var gtag: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor(private gtag: Gtag) { }

  // ! Home
  // * Secciones
  onSectionClick_GA(_nombre: string) { // *
    this.gtag.event('click', {
      event_category: 'Home',
      event_label: 'Sección: ' + _nombre
    });
  }

  onActividadDetalleClick(_nombre: string ) { // *
    this.gtag.event('click', {
      event_category: 'Home',
      event_label: 'Abre detalle actividad: ' + _nombre
    });
  }

  onCumpleaniosClick() { // *
    this.gtag.event('click', {
      event_category: 'Home',
      event_label: 'Click en: Ir a Cumpleaños'
    });
  }

  onChatClickWindow() { // *
    this.gtag.event('click', {
      event_category: 'Home',
      event_label: 'Abrir: Lista de chat'
    });
  }

  onContactosClick() { // *
    this.gtag.event('click', {
      event_category: 'Home',
      event_label: 'Abrir: Contactos'
    });
  }

  onEncuestaClickWindows() { // *
    this.gtag.event('click', {
      event_category: 'Home',
      event_label: 'Abrir: Encuestas'
    });
  }

  onResultadosVideo() { // *
    this.gtag.event('play', {
      event_category: 'Home',
      event_label: 'Abrir: Video Resultados'
    });
  }

  onNewsClick(_nombre: string) {
    this.gtag.event('click', {
      event_category: 'Noticias',
      event_label: 'Noticia: ' + _nombre
    });
  }
}
