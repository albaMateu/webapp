import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, RequestOptions } from '@angular/common/http';

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

  getProductos(){
    return "Texto desde el servicio";
  }

}

