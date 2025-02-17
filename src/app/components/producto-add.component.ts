import { Producto } from './../models/producto';
import { ProductoService } from './../services/producto.service';

import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';


@Component({
  selector: 'producto-add',
  templateUrl: '../views/producto-add.html',
  providers: [ProductoService]
})
export class ProductoAddComponent{
  public titulo:string;
  public producto : Producto;

  public filesToUpload;
  public resultUpload;
  public is_edit; //perque sino dona error en la vista, es necessita per a editar

  constructor(
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.titulo="Crear un nuevo producto";
    //producte que s'utilitza per a anar modificant-lo en el formulari
    this.producto=new Producto(0,'','',0,'');
    this.is_edit = false;
  }

  ngOnInit() {
    console.log("producto-add.component.ts cargado");
  }

  //guarda producto con imagen
  onSubmit(){
    console.log("prod-add.ts Onsubmit",this.producto);
    console.log("prod-add.ts filestoupload",this.filesToUpload[0].name);

    //si filestoupload es 1 es que existeix fitxer per a pujar
    if(this.filesToUpload && this.filesToUpload.length <= 1){
      //les funcions que venen del resultat de una promesa com es makeFileRequest, s'han d'encadenar
      //de la funció then() que dins inclou 2 funcions callback result i error.
      this._productoService.makeFileRequest(GLOBAL.url+'upload-file',[],this.filesToUpload).then(
        (result)=>{
          console.log("result makeFileRequest-backend",result);
          this.resultUpload=result;
          //guarda el nom del fitxer en la variable imatge del producte
          this.producto.imagen = this.resultUpload.filename;
          console.log("resultupload dins if",this.resultUpload.filename);
          this.saveProducto();
        },
        (error) =>{
          console.log(error);
        }
      );
    }else{
      this.saveProducto();
    }
  }

  //guardar producto sin imagen
  saveProducto(){
    console.log("saveProducto",this.producto);
    this._productoService.addProducto(this.producto).subscribe(
      response => {
        if(response.code == 200){
          //nos lleva a productos
          this._router.navigate(['/productos']);
        }else{
          console.log(response);
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

  //catura els fitxers a pujar
  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;

    console.log("prod-add.ts ",this.filesToUpload);
  }
}
