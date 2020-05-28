import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './global';
import { Producto } from './../models/producto';

@Injectable()
export class ProductoService{
  public url:string;

  constructor(
    public _http:HttpClient
  ){
    this.url=GLOBAL.url;
  }

  //Es importante indicarle al método que devolverá un Observable y el tipo
  //de dato que devolverá el observable al hacer el subscribe, si el api
  //rest devuelve un objeto que no corresponde 100% con los modelos que
  //tengas en Angular, es mejor indicarle el tipo any.
  getProductos(): Observable<any>{
    //agarra la URL de la API que tenim en la variable Global i concatena el metodo que volem de la api
    return this._http.get(this.url+'productos');
  }

  //detalles de producto
  getProducto(id):Observable<any>{
    return this._http.get(this.url+'producto/'+id);
  }

  addProducto(producto:Producto): Observable<any>{
    //convertix l'objecte que reb del form en js a json
    let json = JSON.stringify(producto);
    //parametre on posarem el json per a enviar-lo al servidor en la petició ajax
    let params ='json='+json;
    //configuració de la capçalera per a una sol·licitud HTTP. Depen del backend
    let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

    //petició al servidor
    return this._http.post(this.url+'producto', params, {headers:headers});
  }

  editProducto(id, producto:Producto): Observable<any>{
    let json =JSON.stringify(producto);
    let params = "json="+json;
    let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    //url del metodo de la api
    return this._http.post(this.url+'update-producto/'+id, params, {headers:headers});

  }

  deleteProducto(id): Observable<any>{
    //url del metodo de la api
    return this._http.get(this.url+'delete-producto/'+id);

  }

  //subir fichero
  makeFileRequest(url:string, params: Array <string>, files: Array <File>){
    console.log("files makefilerequest",files);
    //fer que no siga async
    return new Promise((resolve, reject)=>{
      //crea un objecte buit com si fora d'un formulari que és el que enviarem
      var formData: any = new FormData();
      //Para hacer la peticion ajax
      var xhr= new XMLHttpRequest();

      //recorrer todos los ficheros que contiene files para meterlos en formData
      for (let i = 0; i < files.length; i++) {
        //(nom del camp a rebre del backend el _FILES del backend, fitxer, nom del fitxer)
        console.log('uploads[]',files[i],files[i].name);
        formData.append('uploads[]',files[i],files[i].name);
      }
      //Cuando la petición ajax (xhr) pase a estar preparada (onreadystatechange)
      //onreadystatechange se ejecutará cuando la solicitud reciba una respuesta por ser async.(respuesta del send )
      xhr.onreadystatechange=function(){
        //Manté l'estat de XMLHttpRequest.
        //0: sol·licitud no inicialitzada
        //1: establerta la connexió amb el servidor
        //2: sol·licitud rebuda
        //3: sol·licitud de tramitació
        //4: finalitza la sol·licitud i la resposta està preparada
        if(xhr.readyState == 4){
          //si ha sido exitosa
          //status: Retorna el número d'estat d'una sol·licitud 200: "D'acord" 403 Prohibit" 404 No troba
          if(xhr.status == 200){
            //re recoge el resultado de la petición y lo pasa a JSON
            resolve(JSON.parse(xhr.response));
          }else{
            //se recoge el error de la petición
            reject(xhr.response);
          }
        }
      };
      //(metodo GET o POST, url al backend, async true o false, usuario, pwd)
      //siempre async en true
      //Especifica el tipus de sol·licitud
      xhr.open("POST",url,true);
      //se envia
      console.log("form data prod-service makefilerequest",formData);
      xhr.send(formData);
    });
  }

}

