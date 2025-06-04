// src/app/services/news.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  slug: string;
  content: string;
  image: {
    id: number;
    fileName: string;
    contentType: string;
    url: string;
    filePath: string;
  };
}


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:4000/api/auth/news';

  constructor(private http: HttpClient) {}

  getNews(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(this.apiUrl);
  }
}
