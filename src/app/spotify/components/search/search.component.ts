import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/core/services/spotify.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgKnob } from 'node_modules/ng-knob/dist/ngKnob.js';
import { Options, ChangeContext } from 'ng5-slider';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  // Collectors for request params
  seedSongs: any[] = [];
  seedArtists: any[] = [];
  audioFeatures = {};
  recommendedSongs: any[] = [];

  constructor(private spotify: SpotifyService) {

  }

  search(search_query: string){
    console.log(search_query);
  }

  listDrop(event){
    var songId = event.item.element.nativeElement.id;
    var songName = event.item.element.nativeElement.text;


    if (!this.seedSongs.some(e => e.id == songId) && songId != "" && this.seedSongs.length < 5)
    {
      this.seedSongs.push(
        {
          id: songId,
          name: songName,
          type: "track"
        }
      )
    }

  }

  removeSeed(event){
    console.log("trying to remove seed");
    console.log(event);
  }


  fetchRecommendations(){
    console.log("Fetch Recommendations");


    


    this.spotify.getRecommendations(this.seedSongs)
      .subscribe( (data: any) => {
        console.log(data);
        this.recommendedSongs = data;
        
      });
  }

  //get debugging values

  

  // Slider values


  popularityVal: number = 0;
  energyVal: number = 0;
  vocalsVal: number = 0;
  tempoVal: number = 0;
  danceableVal: number = 0;
  moodVal: number = 0;
  acousticVal: number = 0;

  popularityHigh: number = 1;
  energyHigh: number = 1;
  vocalsHigh: number = 1;
  tempoHigh: number = 1;
  danceableHigh: number = 1;
  moodHigh: number = 1;
  acousticHigh: number = 1;

  popularityOptions: Options = {
    floor: 0.0,
    ceil: 1,
    step: 0.01,
    showTicks: true
  }

  energyOptions: Options = {
    floor: 0.0,
    ceil: 1,
    step: 0.01,
    showTicks: true
  }

  vocalsOptions: Options = {
    floor: 0.0,
    ceil: 1,
    step: 0.01,
    showTicks: true
  }

  tempoOptions: Options = {
    floor: 0.0,
    ceil: 1,
    step: 0.01,
    showTicks: true
  }

  danceableOptions: Options = {
    floor: 0.0,
    ceil: 1,
    step: 0.01,
    showTicks: true
  }

  moodOptions: Options = {
    floor: 0.0,
    ceil: 1,
    step: 0.01,
    showTicks: true
  }

  acousticOptions: Options = {
    floor: 0.0,
    ceil: 1,
    step: 0.01,
    showTicks: true
  }



}

