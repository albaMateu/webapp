import { ProductoEditComponent } from './components/producto-edit.component';
import { ProductoDetailComponent } from './components/producto-detail.component';
import { ProductoAddComponent } from './components/producto-add.component';
import { HomeComponent } from "./components/home.component";
import { ErrorComponent } from "./components/error.component";
import { ProductosListComponent } from './components/productos-list.component';


import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
   {path: '', component: HomeComponent},
   {path: 'home', component: HomeComponent},
   {path: 'productos', component: ProductosListComponent},
   {path: 'crear-producto', component: ProductoAddComponent},
   {path: 'producto/:id', component: ProductoDetailComponent},
   {path: 'editar-producto/:id', component: ProductoEditComponent},
   {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
