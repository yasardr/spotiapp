import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html'
})
export class ArtistaComponent {

  artista: any = {};
  topTracks: any[] = [];
  loadingArtist: boolean;

  constructor( private activatedRoute: ActivatedRoute,
               private spotify: SpotifyService ) {

    this.loadingArtist = true;
    this.activatedRoute.params.subscribe(params => {
      this.getArtista(params[`id`]);
      this.getTopTracks(params[`id`]);
    });

  }

  getArtista( id: string ): void {
    this.spotify.getArtista(id)
        .subscribe((artista: any) => {
          this.artista = artista;
          this.loadingArtist = false;
        });
  }

  getTopTracks(id: string): void {
    this.spotify.getTopTracks( id )
        .subscribe((toptracks: any) => {
          this.topTracks = toptracks;
        });
  }

}
