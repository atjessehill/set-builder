import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../core/services/spotify.service';
import { BehaviorSubject } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  public playlistsDisplay: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  playlists: any[] = [];
  isPlaylists: boolean = true;
  debugging: boolean = true;

  constructor( private spotify: SpotifyService) { 
    // this.playlists = this.spotify.getNewReleases();

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

  drop(event: CdkDragDrop<string[]>){
    console.log(event);

  }

  ngOnInit() {
  }

}
