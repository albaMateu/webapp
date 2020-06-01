import { Producto } from './../models/producto';
import { ProductoService } from './../services/producto.service';

import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'productos-list',
  templateUrl: '../views/productos-list.html',
  providers: [ProductoService]
})
export class ProductosListComponent{
  public titulo:string;
  public productos: Producto[];
  //indica si se ha confirmado o cancelado el borrar producto.
  public confirmado;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _productoService: ProductoService
  ){
    this.titulo= "Listado de productos";
    this.confirmado=null;
  }

  ngOnInit() {
    console.log("productos-list.component.ts cargado");
    this.getProductos();
  }

  //listado de productos
  getProductos(){
    this._productoService.getProductos().subscribe(
      result => {
        if(result.code != 200){
          console.log(result)
        }else{
          //data es on esta l'array de objectes producto
          this.productos=result.data;
        }
      },
      error => {
        console.log(<any>error);
      }

    );
  }

  borrarConfirm(id){
    this.confirmado=id;
    //$(".caption").addClass(".transp");

  }
  cancelarConfirm(){
    this.confirmado=null;
  }

  //elimina un producto
  onDeleteProducto(id){

    if (this.confirmado) {
      //elimina el producte
      this._productoService.deleteProducto(id).subscribe(
        response =>{
          if (response.code == 200) {
            //si s'elimina bé, em mostra els productes
            this.getProductos();
          }else{
            alert("Error al borrar el producto.");
          }

        },
        error =>{
          console.log(<any>error);
        }
      );
    }

  }
}
