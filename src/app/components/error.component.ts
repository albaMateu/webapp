import { Component } from "@angular/core";

@Component({
  selector: 'error',
  templateUrl: '../views/home.html',
})
export class ErrorComponent{
  public titulo: string;
  public subtitulo: string;

  constructor(){
    this.titulo="Error!! Página no encontrada";
    this.subtitulo="La página que intentas cargar no existe, prueba con estos botones";
  }

  ngOnInit() {
    console.log("Componente error.component.ts cargado");
  }
}
