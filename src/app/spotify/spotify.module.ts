import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpotifyRoutingModule } from './spotify-routing.module';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { SearchComponent } from './components/search/search.component';
import { SpotifyMainComponent } from './spotify-main/spotify-main.component';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [PlaylistsComponent, SearchComponent, SpotifyMainComponent],
  imports: [
    CommonModule,
    SpotifyRoutingModule,
    DragDropModule
  ]
})
export class SpotifyModule { }
