import { Injectable } from '@angular/core';
import { Gtag } from 'angular-gtag';

// declare var gtag: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor(private gtag: Gtag) { }

  // ! Home *
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
      event_label: 'Home Banner | Noticia: ' + _nombre
    });
  }

  // ! Propiedad
  onPropiedadClick(_nombre: string) {
    this.gtag.event('click', {
      event_category: 'Propiedad',
      event_label: 'Propiedad: ' + _nombre
    });
  }

  // ! Beneficios *
  onBeneficioMenuClick(_nombre: string) {
    this.gtag.event('click', {
      event_category: 'Beneficios',
      event_label: 'Sección beneficio: ' + _nombre
    });
  }

  onSaludMenuClick(_nombre: string) {
    this.gtag.event('click', {
      event_category: 'Beneficios',
      event_label: 'Beneficios | Salud: ' + _nombre
    });
  }

  onConveniosMenuClick(_nombre: string) {
    this.gtag.event('click', {
      event_category: 'Beneficios',
      event_label: 'Beneficios | Convenios: ' + _nombre
    });
  }

  onFormularioMenuClick( _type: string, _nombre: string ) {
    this.gtag.event('click', {
      event_category: 'Beneficios',
      event_label: 'Beneficios | Formularios - ' + _type + ': ' + _nombre
    });
  }

  // ! Persa *
  onPersaCompra(_nombre: string) {
    this.gtag.event('buy', {
      event_category: 'Persa',
      event_label: 'Persa | Compra producto: ' + _nombre
    });
  }

  onPersaPublicar(_nombre: string) {
    this.gtag.event('publish', {
      event_category: 'Persa',
      event_label: 'Persa | Publica producto: ' + _nombre
    });
  }

  // ! Chat
  onChatSearch(_nombre: string) {
    this.gtag.event('search', {
      event_category: 'Chat',
      event_label: 'Chat | Buscar: ' + _nombre
    });
  }

  onChatSendMessage() {
    this.gtag.event('send', {
      event_category: 'Chat',
      event_label: 'Chat | Mensaje Enviado'
    });
  }

  // ! Formularios (Navbar)
  onFormularioClick(_nombre: string) {
    this.gtag.event('click', {
      event_category: 'Formularios (Navbar)',
      event_label: 'Formularios | Formulario descargado: ' + _nombre
    });
  }

  // ! Branding y Formatos
  onBrandingDownload(_nombre: string) {
    this.gtag.event('click', {
      event_category: 'Branding y Formatos',
      event_label: 'Branding | Archivo descargado: ' + _nombre
    });
  }

  // ! Reconozco
  onReconozcoLike() {
    this.gtag.event('like', {
      event_category: 'Te reconozco por ESTAR',
      event_label: 'Reconozco | Me gusta enviado'
    });
  }

  // ! Desafio Austeridad
  onDesafioAusteridadStart() {
    this.gtag.event('click', {
      event_category: 'Desafio Austeridad',
      event_label: 'Desafio Austeridad | Click en comenzar'
    });
  }

  // ! Noticias
  onNewsOpen(_nombre: string) {
    this.gtag.event('click', {
      event_category: 'Noticias',
      event_label: 'Noticias | Noticia abierta: ' + _nombre
    });
  }

  onNewsLike() {
    this.gtag.event('like', {
      event_category: 'Noticias',
      event_label: 'Noticias | Me gusta'
    });
  }

  onNewsComment() {
    this.gtag.event('click', {
      event_category: 'Noticias',
      event_label: 'Noticias | Comentario creado'
    });
  }

  onVideoPlayed(_nombre: string) {
    this.gtag.event('play', {
      event_category: 'Portal de Videos',
      event_label: 'Portal | Video reproducido: ' + _nombre
    });
  }
}
