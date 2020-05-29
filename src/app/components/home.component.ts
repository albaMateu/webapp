import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: '../views/home.html'
})
export class HomeComponent {
  public titulo:string;
  public subtitulo: string;

  constructor(){
    this.titulo= "WebApp de Productos con Angular 4";
    this.subtitulo="Gestiona tus productos con la aplicación web SPA creada con Angular desde cero";
  }

  ngOnInit(){
    console.log("Se ha cargado el componente Home");
  }
}
