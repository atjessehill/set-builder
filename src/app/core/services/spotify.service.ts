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
      'Authorization': 'Bearer BQCm_xpVQ14ACDODgqdx8Ta3_D6w1XIZDYGKuhTMzXgnxVp4cJa9c41xHrxyms1rH1L4_v89pijY239itDsQEH81Ck81danVuGDj5JNLhzdTI7s1-9EPXa1o5CxdDUD-_D20VfjGEElxOqUG4LVUrb4FI8FmSA6G5UnB872vIXr1Bt5BEwTEsf43HBtmBk9NpuYMzx8phA'
    });

    var username = 'jup118';
    var url = 'https://api.spotify.com/v1/users/'.concat(username, '/playlists?limit=50');

    return this.http.get(url, {  headers  });

  }

  getPlaylistTracks(playlistId: string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCm_xpVQ14ACDODgqdx8Ta3_D6w1XIZDYGKuhTMzXgnxVp4cJa9c41xHrxyms1rH1L4_v89pijY239itDsQEH81Ck81danVuGDj5JNLhzdTI7s1-9EPXa1o5CxdDUD-_D20VfjGEElxOqUG4LVUrb4FI8FmSA6G5UnB872vIXr1Bt5BEwTEsf43HBtmBk9NpuYMzx8phA'
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

  getRecommendations(seedVals){
    console.log(seedVals);

    let songs = seedVals.songs;
    let tunables = seedVals.form;

    let tunablesList = [];
    let tunablesUrl;
    
    let recList = [];
    let recUrl = "";
    
    if (seedVals.hasOwnProperty('songs')){
      console.log("has own property");
      let songList = [];
      let songUrl;

      Object.keys(songs).forEach(function(key){

        // artistUrl = artistUrl+songs[key]+',';
  
        songList.push(songs[key]['id']);
  
      });

      if (songList.length > 0){
        songUrl = "seed_tracks="+songList.join(',')
        recList.push(songUrl);
      }

    }




    Object.keys(tunables).forEach(function(key){

      // console.log(tunables[key]);

      let appendVal;
      if (tunables[key]['isRange']){
        
        let minVal = "min_"+tunables[key]["spotName"]+"="+tunables[key]["minVal"];
        let maxVal = "max_"+tunables[key]["spotName"]+"="+tunables[key]["maxVal"];
        tunablesList.push(minVal, maxVal);
      }else{

        let tgtVal = "target_"+tunables[key]["spotName"]+"="+tunables[key]["maxVal"];
        tunablesList.push(tgtVal);
      }

    });

    if (tunablesList.length > 0){
      tunablesUrl = tunablesList.join('&');
      recList.push(tunablesUrl);
    }

    recUrl = recList.join('&');
  

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCm_xpVQ14ACDODgqdx8Ta3_D6w1XIZDYGKuhTMzXgnxVp4cJa9c41xHrxyms1rH1L4_v89pijY239itDsQEH81Ck81danVuGDj5JNLhzdTI7s1-9EPXa1o5CxdDUD-_D20VfjGEElxOqUG4LVUrb4FI8FmSA6G5UnB872vIXr1Bt5BEwTEsf43HBtmBk9NpuYMzx8phA'
    });

    var url = 'https://api.spotify.com/v1/recommendations?'.concat(recUrl)+"&market=US";
    console.log(url);
    return this.http.get(url, {  headers  })
      .pipe( map(data =>{
        // let items = data['items'];
        // let name = items[4];
        // console.log(name);
        return data['tracks'];
      }));

  }


}
