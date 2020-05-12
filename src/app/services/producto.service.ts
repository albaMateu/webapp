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

}

