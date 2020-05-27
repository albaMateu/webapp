import { Producto } from './../models/producto';
import { ProductoService } from './../services/producto.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component } from "@angular/core";

@Component({
  selector: 'prducto-detail',
  templateUrl: '../views/producto-detail.html',
  providers: [ProductoService]

})

export class ProductoDetailComponent{
    public producto: Producto;

    constructor(
      private _prductoService: ProductoService,
      private _route: ActivatedRoute,
      private _router: Router
    ){

    }

    ngOnInit() {
      console.log("producto-detail.component.ts cargado");
      this.getProducto();
    }

    getProducto(){
      //recoger parametro de la URL en forma de array
      this._route.params.forEach((params:Params) =>{
        let id = params['id'];

        //LLAMAMOS AL SERVICIO
        this._prductoService.getProducto(id).subscribe(
          response =>{
            if(response.code == 200){
              this.producto= response.data; //la respuesta del servicio
            }else{
              this._router.navigate(['/productos']);
            }

          },
          error =>{
            console.log(<any>error);
          }
        );
      });

    }

}
