import { ProductoAddComponent } from './producto-add.component';
import { ProductoService } from './../services/producto.service';
import { Producto } from '../models/producto';


import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component } from "@angular/core";
import { GLOBAL } from '../services/global';


@Component({
  selector: 'producto-edit',
  templateUrl: '../views/producto-add.html', //reutiliza la vista del addComponent
  providers: [ProductoService]
})
export class ProductoEditComponent {
  public titulo:string;
  public producto: Producto;

  public filesToUpload;
  public resultUpload;
  public is_edit; //si hay imagen para modificar

  constructor(
    private _productoService: ProductoService,
    private _route:ActivatedRoute,
    private _router: Router
  ){
    this.titulo='Editar producto';
    this.producto= new Producto(1,'' ,'' ,0,'' );
    this.is_edit=true;
  }

  ngOnInit() {
    console.log(this.titulo);
    //nos carga la información del producto en el form
    this.getProducto();
  }

  getProducto(){
    //recoger parametro de la URL en forma de array
    this._route.params.forEach((params:Params) =>{
      let id = params['id'];

      //LLAMAMOS AL SERVICIO
      this._productoService.getProducto(id).subscribe(
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


  //guarda producto con imagen
  onSubmit(){
    console.log("prod-edit.ts Onsubmit",this.producto);

    //si filestoupload existeix i es 1 es que existeix fitxer per a pujar
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
          this.updateProducto();
        },
        (error) =>{
          console.log(error);
        }
      );
    }else{
      this.updateProducto();
    }
  }

  //modifica producto sin imagen
  updateProducto(){
    console.log("updateProducto",this.producto);

    //recoger parametro de la URL en forma de array
    this._route.params.forEach((params:Params) =>{
      let id = params['id'];

      this._productoService.editProducto(id,this.producto).subscribe(
        response => {
          if(response.code == 200){
            //nos lleva a productos
            this._router.navigate(['/producto/'+id]);
          }else{
            console.log(response);
          }
        },
        error =>{
          console.log(<any>error);
        }
      );
    });
  }

  //captura els fitxers a pujar
  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;

    console.log("prod-edit.ts ",this.filesToUpload);
  }
}
