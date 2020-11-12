import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  artistas: any[] = [];
  loading: boolean;

  constructor( private spotify: SpotifyService ) {}

  buscar( termino: string ): void {

    if (!termino) {
      return;
    }

    this.loading = true;

    this.spotify.getArtistas( termino )
      .subscribe((data: any) => {
        if (data.length === 0) {
          console.log(`No hay resultados para ${termino}`);
        }
        this.artistas = data;
        this.loading = false;
      });
  }

}
