import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SpotifyService } from 'src/app/core/services/spotify.service';


@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {

  playlists: any[] = [];
  songRecomendations: any = [];
  isPlaylists: boolean = true;
  debugging: boolean = true;

  constructor(private spotify: SpotifyService) { 

    this.getPlaylists();
  }


  recSettings = new FormGroup({
    danceableSettings: new FormGroup({
      isRange: new FormControl(true),
      minVal: new FormControl('0.0'),
      maxVal: new FormControl('1.0'),
      spotName: new FormControl('danceability')
    }),
    acousticSettings: new FormGroup({
      isRange: new FormControl(true),
      minVal: new FormControl('0.0'),
      maxVal: new FormControl('1.0'),
      spotName: new FormControl('acousticness')
    }),
    energySettings: new FormGroup({
      isRange: new FormControl(true),
      minVal: new FormControl('0.0'),
      maxVal: new FormControl('1.0'),
      spotName: new FormControl('energy')
    }),
    instrumentalSettings: new FormGroup({
      isRange: new FormControl(true),
      minVal: new FormControl('0.0'),
      maxVal: new FormControl('1.0'),
      spotName: new FormControl('energy')

    }), 
  });

  ngOnInit() {
    // this.recSettings['danceableSettings']['selectRange'] =

  }

  seedSongs: any[] = [];
  seedArtists: any[] = [];

  danceableRange: boolean = true;
  acousticRange: boolean = true;
  energyRange: boolean = true;
  instrumentalRange: boolean = true;
  


  addSong(event){
    var songId = event.toElement.id;

    var songId = event.toElement.id;
    var songName = event.toElement.text;

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
    var seedId = event.toElement.id;

    var i = 0;
    var index = 0;
    for (i = 0; i<this.seedSongs.length; i++){
      if (this.seedSongs[i].id == seedId){
        index = i;
        this.seedSongs.splice(i, 1);
        break;
      }

    }
  }


  submitRecs(){
    
    let formraw = this.recSettings.getRawValue();
    // console.log(formraw);
    Object.keys(this.recSettings.controls).forEach(key => {

      let item = this.recSettings.controls[key].value;

      if (item['isRange'] && item['minVal'] == '0.0' && item['maxVal'] == '1.0'){
        delete formraw[key];
      }

    });

    let sendDict = {
      form: formraw,
    }

    if (this.seedSongs.length > 0){

      sendDict['songs'] = this.seedSongs;
    }




    // var test = this.spotify.getRecommendations(sendDict);
    // console.log(test);

    if (this.debugging){

      this.songRecomendations = [
        {id: "5mZLb0zrBBpyqhQKJ6c8Ov", name: "Running Up That Hill", type: "track"},
        {id: "5Vq2NGaB9ceeROuvx1yXKg", name: "Said (Coke Studio Africa)", type: "track"},
        {id: "79pgmwpD7OLk22bi87Zgnx", name: "One Grain", type: "track"},
        {id: "5nZ4NCW8rdh7mK95VWvERC", name: "Turn It Around - Monkey Safari Remix", type: "track"},
        {id: "5F9MTKbl71pDkHVpbyXjwK", name: "Coming Back - Maya Jane Coles Remix", type: "track"},
        {id: "26UCZAfUYfAsE25ls7gS1m", name: "Stimela Sasezola", type: "track"},
        {id: "6zmGmMfP6FsHvKwEonQjFU", name: "Insulin", type: "track"},
        {id: "56d4iujHilI89EaPxDwga6", name: "Inkanyezi", type: "track"},
        {id: "2cV5IKy6RdZ5RyN6mLGy1j", name: "Reach It", type: "track"},
        {id: "6syOrBhOUeNAvCTt5J3weM", name: "Drip Siphi Iskorobho", type: "track"},
        {id: "1WHGJLdJNOh692MPLwYxcu", name: "Pour", type: "track"},
        {id: "1YWSj1KlUSQLwyBdFL6q8P", name: "Form", type: "track"},
        {id: "0gwNGHcBRYtF7mvgUczVo1", name: "Return to Oz - ARTBAT Remix", type: "track"},
        {id: "4cNddE5nZx8zpDJlwzxBkQ", name: "Witch Hunt", type: "track"},
        {id: "43sbVRZNKLV4gtFm4Wx7hb", name: "Vincent Price", type: "track"},
        {id: "3wZnibMPST2XPmYujhvE8d", name: "Thandiwe", type: "track"},
        {id: "4W76PWtsmhFsKQV71Ob2pO", name: "Cure", type: "track"},
        {id: "2spksuDM1a7wICynsNMwGX", name: "When I Am Only a Dream", type: "track"},
        {id: "3lpb1iviYHWDq9m3h0v9mL", name: "Now's The Only Time I Know", type: "track"},
        {id: "5GVm0Jyse3MfehoC1T6NiR", name: "Salvation", type: "track"}
      ]



    }else{
      this.spotify.getRecommendations(sendDict)
      .subscribe( (data: any) => {
  
        console.log(data);
        var songDict: any[] = [];
        data.forEach(item =>{
          songDict.push(
            {id: item['id'],
            name: item['name'],
            type: "track"}
          );
        });
  
  
        this.songRecomendations = songDict;
      });
      
    }

    console.log(this.songRecomendations);

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

  changeBtnDance(event){

    var id = event.toElement.id;


    //danceability
    if (id == "btn-danceable-range" && !this.danceableRange){
      this.danceableRange = true;
      this.recSettings.get('danceableSettings')['controls']['minVal'].enable();
      this.recSettings.get('danceableSettings')['controls']['isRange'].setValue(true);

      // .controls['minVal'].enable();
      return;
    }

    if (id == "btn-danceable-target" && this.danceableRange){
      this.danceableRange = false;
      // this.recSettings.controls['danceableSettings'].controls['minVal'].disable();
      this.recSettings.get('danceableSettings')['controls']['minVal'].disable();
      this.recSettings.get('danceableSettings')['controls']['isRange'].setValue(false);

      
      return;
    }

    //acoustic
    if (id == "btn-acoustic-range" && !this.acousticRange){
      this.acousticRange = true;
      this.recSettings.get('acousticSettings')['controls']['minVal'].enable();
      this.recSettings.get('acousticSettings')['controls']['isRange'].setValue(true);

      return;
    }

    if (id == "btn-acoustic-target" && this.acousticRange){
      this.acousticRange = false;
      this.recSettings.get('acousticSettings')['controls']['minVal'].disable();
      this.recSettings.get('acousticSettings')['controls']['isRange'].setValue(false);

      return;
    }

    //energy
    if (id == "btn-energy-range" && !this.energyRange){
      this.energyRange = true;
      this.recSettings.get('energySettings')['controls']['minVal'].enable();
      this.recSettings.get('energySettings')['controls']['isRange'].setValue(true);
      return;
    }

    if (id == "btn-energy-target" && this.energyRange){
      this.energyRange = false;
      this.recSettings.get('energySettings')['controls']['minVal'].disable();
      this.recSettings.get('energySettings')['controls']['isRange'].setValue(false);
      return;
    }
    
    //Instrumentalness
    if (id == "btn-instrumental-range" && !this.instrumentalRange){
      this.instrumentalRange = true;
      this.recSettings.get('instrumentalSettings')['controls']['minVal'].enable();
      this.recSettings.get('energySettings')['controls']['isRange'].setValue(true);

      return;
    }

    if (id == "btn-instrumental-target" && this.instrumentalRange){
      this.instrumentalRange = false;
      this.recSettings.get('instrumentalSettings')['controls']['minVal'].disable();
      this.recSettings.get('energySettings')['controls']['isRange'].setValue(false);

      return;
    }

  }

  getPlaylists(){
    if (this.debugging){
      this.playlists = [{id: "0iGABH7qHUQpHsz0yaUxTV", name: "BIG TESTS GOING ON ", type: "playlist"},
      {id: "3DuqCNmSiCmolLzycHAKTJ", name: "baaeline ", type: "playlist"},
      {id: "2NSCEJQxzhT1dZKBfJ8szo", name: "live in philly", type: "playlist"},
      {id: "2MhesGhFkrMBLfHOjaVaeV", name: "easing into it", type: "playlist"},
      {id: "0fNRXosqXjKdB9b5reNqyn", name: "life comes at you fast: builds", type: "playlist"},
      {id: "1Nrl3PIy4HdzukWAZ9I5MQ", name: "seeds", type: "playlist"},
      {id: "0ZebXZzb88fEUsSobGqRdS", name: "time to catch your breath", type: "playlist"},
      {id: "0RhzEUdHINzK5It7aUTxln", name: "a simple life", type: "playlist"},
      {id: "604EbuMGUsKgQYSKgxi4CT", name: "different from most", type: "playlist"},
      {id: "327hbqqmoofbFApAh9ThLz", name: "i made this #1 ", type: "playlist"},
      {id: "6Ey5AxPQsGL50g0tSwCnH6", name: "theMacarena", type: "playlist"},
      {id: "61vNz9ABIBcnX5iuDi8Wh0", name: "the cool", type: "playlist"},
      {id: "5hm48eu4wfjeTa9mhssxqB", name: "EG SPOTLIGHT.036 Rivellino", type: "playlist"},
      {id: "7fizmeUmv538dfFoSXSXw2", name: "keeping it progressive ", type: "playlist"},
      {id: "7Li4zd1lfEuyb8Fw8MwdPp", name: "chasing the funk ", type: "playlist"},
      {id: "0zhwKtWbUeVwBLjfYcqGju", name: "DJ T. – The Inner Jukebox", type: "playlist"},
      {id: "485BY1azaetSofb2StyHeK", name: "digital dance hall", type: "playlist"},
      {id: "0JV066SqXK42KmMkSswOUU", name: "in the lab", type: "playlist"},
      {id: "01X2Qj8ToHWmIqSNQQ0csc", name: "Darin Epsilon Live @ Electric Animals", type: "playlist"},
      {id: "5xzoji6oT9qSnpkfNbJGgi", name: "Rivellino 60", type: "playlist"},
      {id: "6KIKsefTgZy0oWKvjKMGGZ", name: "Rivellino 60 [souffle]", type: "playlist"},
      {id: "0o0ziqCP4IfX93tOz1Mhzw", name: "mathematics", type: "playlist"},
      {id: "3nEqDGIFVOZYDTZKvQUErf", name: "the basement", type: "playlist"},
      {id: "58afVlmUO9Y2s2qtUPyJU4", name: "jamie xx", type: "playlist"},
      {id: "5QBze8Y6NzBC9LV7gCf40T", name: "approaching limit", type: "playlist"},
      {id: "4i27QStnrF4Ej8x4jbOvhV", name: "jessito por cercle ", type: "playlist"}
      ]
    }
    else{
      this.spotify.getAllPlaylists()
      .subscribe( (data: any) => {

        var playlistDict: any[] = [];
        data.items.forEach(item =>{
          // console.log(item['track']['name']);
          // console.log(item['track']['id'])
          playlistDict.push(
            {id: item['id'],
            name: item['name'],
            type: "playlist"}
          );
        });

        // console.log(playlistDict);
        console.log(playlistDict);
        this.playlists = playlistDict;
      });

    }

  }

  backtoPlaylists(){
    this.isPlaylists = true;
    this.getPlaylists();

  }

  playlistClicked(event){
    // var split = (event.toElement.id).split('.');
    var playlistId = event.toElement.id;
    this.isPlaylists = false;

    if(this.debugging){
      this.playlists = [
        {id: "6Z23gt9isCE503HDQfgX55", name: "Test K Bug - Street Talk Mix", type: "track"},
        {id: "2A8M6gA0mFvG530npNfasG", name: "Sea Of Tranquility", type: "track"},
        {id: "1KUYG33h05N1m20btYa8jq", name: "City Lights - Kamilo Sanclemente Remix", type: "track"},
        {id: "3CHfArwpMCoqJTgu3FYM7C", name: "Navagio - Club Mix", type: "track"},
        {id: "2xSREw7FPGCBI3yLuC0fqw", name: "Journey Into Light - Original Mix", type: "track"},
        {id: "1OvEv2p7inJgot6FJA5slc", name: "Nine Moons", type: "track"},
        {id: "5fnrQQQvKOVE0t8Y8Ahpwi", name: "Stargaze - Fernando Olaya Remix", type: "track"},
        {id: "2Fz2K6MlzgG3kaXDwRUWiC", name: "Brutus Jam", type: "track"},
        {id: "4I71yZ1Wu6P2tffj9oqeXC", name: "Sand in Your Shoes", type: "track"},
        {id: "5isHe3KdT7VPo3zkROWTlN", name: "Subside - Ezequiel Arias Club Mix", type: "track"},
        {id: "6POiFPMZqr0MPmDd5pG7CH", name: "El Sol - Roger Martinez Remix", type: "track"},
        {id: "3FIb4d6uDgJr0Lf0gLvGlH", name: "Appassionata - Original Mix", type: "track"},
        {id: "49rtqY20dAqoPqdPhMsJ58", name: "Carnatica - Kamilo Sanclemente Remix", type: "track"}
      ]
    }
    else{
      this.spotify.getPlaylistTracks(playlistId)
      .subscribe( (data: any) => {
        // console.log(data[0]['track']['name']);
        // console.log(data);

        var songDict: any[] = [];

        data.forEach(item =>{
          // console.log(item['track']['name']);
          // console.log(item['track']['id'])
          songDict.push(
            {id: item['track']['id'],
            name: item['track']['name'],
            type: "track"}
          );
        });
        console.log(songDict);
        this.playlists = songDict;

      });


    }

  }

}
