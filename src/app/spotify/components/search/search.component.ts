import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/core/services/spotify.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  seedSongs: any[] = [];

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

      });
  }

}

