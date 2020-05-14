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
  public producto : Producto;

  constructor(){
    this.titulo="Crear un nuevo producto";
    //producte que s'utilitza per a anar modificant-lo en el formulari
    this.producto=new Producto(0,'','',0,'');
  }

  ngOnInit() {
    console.log("producto-add.component.ts cargado");
  }

  onSubmit(){
    console.log(this.producto);
  }
}
