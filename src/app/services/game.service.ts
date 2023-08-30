import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development'
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) { }

  getGames(limit: number, offset: number): Observable<Game[]> {
    const params = new HttpParams()
                        .set('limit', limit)
                        .set('offset', offset);
    const headers = new HttpHeaders()
                        .set('content-type', 'application/json')
                        .set('Access-Control-Allow-Origin', '*')
    
    return this.httpClient.get<Game[]>(
      environment.backend_api_url,
      {
        params: params,
        headers: headers
      }
      )
  }
}
