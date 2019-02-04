import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.page.html',
  styleUrls: ['./film-details.page.scss'],
})
export class FilmDetailsPage implements OnInit {

  film: any;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private http: HttpClient) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(`https://swapi.co/api/films/${id}`).subscribe(res => {
      this.film = res;
      console.log('film-details');
      console.log(res);
    });

  }

}
