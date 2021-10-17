import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ResumoComponent } from './components/resumo/resumo.component';

const routes: Routes = [
  { path: 'pedidos', component: PedidosComponent },
  { path: 'resumo', component: ResumoComponent },
  { path: '', redirectTo: 'pedidos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
