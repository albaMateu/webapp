import { Producto } from './../models/producto';
import { ProductoService } from './../services/producto.service';

import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'producto-add',
  templateUrl: '../views/producto-add.html',
  providers: [ProductoService]
})
export class ProductoAddComponent{
  public titulo:string;


  constructor(){
    this.titulo="Crear un nuevo producto";
  }

  ngOnInit() {
    console.log("producto-add.component.ts cargado");
  }
}
