import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {

  constructor() { }


  recSettings = new FormGroup({
    danceableSettings: new FormGroup({
      selectTarget: new FormControl(''),
      minVal: new FormControl(''),
      maxVal: new FormControl('')
    }),
    acousticSettings: new FormGroup({
      selectTarget: new FormControl(''),
      minVal: new FormControl(''),
      maxVal: new FormControl('')
    }),
    energySettings: new FormGroup({
      selectTarget: new FormControl(''),
      minVal: new FormControl(''),
      maxVal: new FormControl('')
    }),
    instrumentalSettings: new FormGroup({
      selectTarget: new FormControl(''),
      minVal: new FormControl(''),
      maxVal: new FormControl('')
    }), 
  });

  ngOnInit() {
    // this.recSettings['danceableSettings']['selectRange'] =

  }

  danceableRange: boolean = true;
  acousticRange: boolean = true;
  energyRange: boolean = true;
  instrumentalRange: boolean = true;
  songSeeds = [];
  artistSeeds = [];
  



  submitRecs(){
    
    if (this.songSeeds.length > 0 || this.artistSeeds.length > 0){


      var targets = [];
      var ranges = [];
      var songSeeds = [];

      if (this.danceableRange){

      }


      return;
    }
    console.log("is 0");
  }


  changeBtnDance(event){

    var id = event.toElement.id;


    //danceability
    if (id == "btn-danceable-range" && !this.danceableRange){
      this.danceableRange = true;
      this.recSettings.get('danceableSettings')['controls']['minVal'].enable();
      
      // .controls['minVal'].enable();
      return;
    }

    if (id == "btn-danceable-target" && this.danceableRange){
      this.danceableRange = false;
      // this.recSettings.controls['danceableSettings'].controls['minVal'].disable();
      this.recSettings.get('danceableSettings')['controls']['minVal'].disable();
      return;
    }

    //acoustic
    if (id == "btn-acoustic-range" && !this.acousticRange){
      this.acousticRange = true;
      this.recSettings.get('acousticSettings')['controls']['minVal'].enable();
      return;
    }

    if (id == "btn-acoustic-target" && this.acousticRange){
      this.acousticRange = false;
      this.recSettings.get('acousticSettings')['controls']['minVal'].disable();
      return;
    }

    //energy
    if (id == "btn-energy-range" && !this.energyRange){
      this.energyRange = true;
      this.recSettings.get('energySettings')['controls']['minVal'].enable();
      return;
    }

    if (id == "btn-energy-target" && this.energyRange){
      this.energyRange = false;
      this.recSettings.get('energySettings')['controls']['minVal'].disable();
      return;
    }
    
    //Instrumentalness
    if (id == "btn-instrumental-range" && !this.instrumentalRange){
      this.instrumentalRange = true;
      this.recSettings.get('instrumentalSettings')['controls']['minVal'].enable();
      return;
    }

    if (id == "btn-instrumental-target" && this.instrumentalRange){
      this.instrumentalRange = false;
      this.recSettings.get('instrumentalSettings')['controls']['minVal'].disable();
      return;
    }

  }

}
