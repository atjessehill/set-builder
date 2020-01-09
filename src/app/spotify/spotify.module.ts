import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpotifyRoutingModule } from './spotify-routing.module';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { SearchComponent } from './components/search/search.component';
import { SpotifyMainComponent } from './spotify-main/spotify-main.component';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { Ng5SliderModule } from 'node_modules/ng5-slider';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PlaylistsComponent, SearchComponent, SpotifyMainComponent, RecommendationComponent],
  imports: [
    CommonModule,
    SpotifyRoutingModule,
    DragDropModule,
    Ng5SliderModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SpotifyModule { }
