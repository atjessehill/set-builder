import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  // change_value: any;
  // valueChange: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient) {
    console.log("Spotify service ready");
  }
  // private _refreshNeeded$ = new Subject<void>();

  // get refreshNeeded$(){

  //   return this._refreshNeeded$;
  // }

  getNewReleases(){

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBMbNRrAEElwXg_DWokkECu850KWgZeeY7owK2ITITbCWvUnrILWXHDojF_pDB316pp-CTh1VpPUDiIT0tzWSG6LyFe4qkBfo828j_LenTdXmvZ1SJ9K2KZr2-oR_5pSPwlKVM26wElpOPOR_m89N957vUHJZ_lnffPvlFQqAoOMGYLjvqfU2M-lWS65DWb35-KNmyJobyF7A'

    });

    return this.http.get('https://api.spotify.com/v1/browse/new-releases', {  headers  });

  }

  getAllPlaylists(){

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCIpFfjSerSNQYPrG2qVBiWParRgMLivPi7FUGIVYzoumHcHKhEP18tsoBhFMi2KrTBEIhXxLrDiRgfTZ73KlB2cUwSG-FZRTJFUZhr4zOMY45wJzh1aovR9irZT23dQ4p8AOMUCf9gQE2HnMlZV_pxobHtnhiW4W8c2bxzqBmv93nRcvBLSsSmnIVhS_CEtuSvV4KD4di-EhEwoHsJ'


    });

    var username = 'jup118';
    var url = 'https://api.spotify.com/v1/users/'.concat(username, '/playlists?limit=50');

    return this.http.get(url, {  headers  });

  }

  getPlaylistTracks(playlistId: string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCIpFfjSerSNQYPrG2qVBiWParRgMLivPi7FUGIVYzoumHcHKhEP18tsoBhFMi2KrTBEIhXxLrDiRgfTZ73KlB2cUwSG-FZRTJFUZhr4zOMY45wJzh1aovR9irZT23dQ4p8AOMUCf9gQE2HnMlZV_pxobHtnhiW4W8c2bxzqBmv93nRcvBLSsSmnIVhS_CEtuSvV4KD4di-EhEwoHsJ'
    });

    var url = 'https://api.spotify.com/v1/playlists/'.concat(playlistId,'/tracks');
    
    return this.http.get(url, {  headers  })
      .pipe( map(data =>{
        // let items = data['items'];
        // let name = items[4];
        // console.log(name);
        return data['items'];
      }));


  }

  getRecommendations(preferences){
    console.log(preferences.seedSongs);
    

    // if (preferences.seedSongs.length > 0):




    // var seedTracks = "seed_tracks=";
    // songSeeds.forEach(song => {
    //   seedTracks = seedTracks.concat(song.id,',');
    // });

    // seedTracks = seedTracks.replace(/,\s*$/, "");

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQCIpFfjSerSNQYPrG2qVBiWParRgMLivPi7FUGIVYzoumHcHKhEP18tsoBhFMi2KrTBEIhXxLrDiRgfTZ73KlB2cUwSG-FZRTJFUZhr4zOMY45wJzh1aovR9irZT23dQ4p8AOMUCf9gQE2HnMlZV_pxobHtnhiW4W8c2bxzqBmv93nRcvBLSsSmnIVhS_CEtuSvV4KD4di-EhEwoHsJ'

    // });

    // var url = 'https://api.spotify.com/v1/recommendations?'.concat(seedTracks);
    
    // return this.http.get(url, {  headers  })
    //   .pipe( map(data => {
    //     let tracksJSON = data['tracks'];
    //     let tracks = [];
    //     tracksJSON.forEach(track => {

    //       let trackArtists = [];
    //       let artistConcat = "";
    //       track['artists'].forEach(artist =>{
            
    //         artistConcat = artistConcat.concat(artist['name'],',');
    //         trackArtists.push({
    //           artistId: artist['id'],
    //           artistName: artist['name'],
    //           type: 'artist'
    //         });

    //       });

    //       tracks.push({
    //         id: track['id'],
    //         artist: trackArtists,
    //         artistString: artistConcat,
    //         trackName: track['name'],
    //         albumName: track['album']['name']
    //       });

    //     });

    //     return tracks;
    //     // return data['tracks'];
    //   }));

  }


}
