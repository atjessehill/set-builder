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


    let vals = {
      seedSongs : this.seedSongs,
      popularityMin: this.popularityVal,
      popularityMax: this.popularityHigh,
      energyMin: this.energyVal,
      energyMax: this.energyHigh,
      vocalsMin: this.vocalsVal,
      vocalsMax: this.vocalsHigh,
      tempoMin: this.tempoVal,
      tempoMax: this.tempoHigh,
      danceableMin: this.danceableVal,
      danceableMax: this.danceableHigh,
      valenceMin: this.valenceVal,
      valenceMax: this.valenceHigh,

    }

    this.spotify.getRecommendations(vals);
      // .subscribe( (data: any) => {
      //   console.log(data);
      //   this.recommendedSongs = data;
        
      // });
  }

  //get debugging values

  

  // Slider values


  popularityVal: number = 0;
  energyVal: number = 0;
  vocalsVal: number = 0;
  tempoVal: number = 0;
  danceableVal: number = 0;
  valenceVal: number = 0;
  instrumentalVal: number = 0;

  popularityHigh: number = 100;
  energyHigh: number = 1;
  vocalsHigh: number = 1;
  tempoHigh: number = 1;
  danceableHigh: number = 1;
  valenceHigh: number = 1;
  instrumentalHigh: number = 1;

  popularityOptions: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
    showTicks: true,
    tickStep: 10,
  }

  energyOptions: Options = {
    floor: 0.0,
    ceil: 1,
    step: 0.01,
    showTicks: true,
    tickStep: .10
  }

  vocalsOptions: Options = {
    floor: 0.0,
    ceil: 1,
    step: 0.01,
    showTicks: true,
    tickStep: .10

  }

  tempoOptions: Options = {
    floor: 0.0,
    ceil: 1,
    step: 0.01,
    showTicks: true,
    tickStep: .10

  }

  danceableOptions: Options = {
    floor: 0.0,
    ceil: 1,
    step: 0.01,
    showTicks: true,
    tickStep: .10

  }

  valenceOptions: Options = {
    floor: 0.0,
    ceil: 1,
    step: 0.01,
    showTicks: true,
    tickStep: .10,
  }

  instrumentalOptions: Options = {
    floor: 0.0,
    ceil: 1,
    step: 0.01,
    showTicks: true,
    tickStep: .10

  }



}

