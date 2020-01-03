import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistsComponent } from './components/playlists/playlists.component';
import { SpotifyMainComponent } from './spotify-main/spotify-main.component';

const routes: Routes = [
  {
    path: '',
    component: SpotifyMainComponent
  },
  {
    path: ':playlistid',
    component: SpotifyMainComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpotifyRoutingModule { }
