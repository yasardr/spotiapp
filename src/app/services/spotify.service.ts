import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) { }

  getQuery( query: string ): any {
    const url = `https://api.spotify.com/v1/${ query }`;
    const accessToken = 'Aqui va el access token generado para consultar el API de Spotify';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.http.get(url, { headers });

  }

  getNewReleases(): any {
    return this.getQuery('browse/new-releases?limit=20')
                .pipe( map( data => data[`albums`].items ) );
  }

  getArtistas( termino: string ): any {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
                .pipe( map( data => data[`artists`].items) );
  }

  getArtista( id: string ): any {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks( id: string ): any {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
                .pipe( map(data => data[`tracks`]) );
  }

}
