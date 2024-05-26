import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { shedResolver } from './core/resolvers/shed.resolver';

import { MenuComponent } from './views/menu/menu.component';
import { ShedComponent } from './views/shed/shed.component';
import { GameComponent } from './views/game/game.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'shed', component: ShedComponent, resolve: { shed: shedResolver } },
  { path: 'game', component: GameComponent },
  { path: '', redirectTo: '/menu', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
