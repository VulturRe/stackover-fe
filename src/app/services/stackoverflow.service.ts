import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuestion, IResponse } from 'src/app/models/stackoverflow';

@Injectable({
  providedIn: 'root'
})
export class StackoverflowService {

  private readonly baseUrl = '/api/stack';

  constructor(private http: HttpClient) { }

  searchByTag(tagged: string, page: number = 1, pageSize: number = 10, order: string = 'desc', sort: string = 'relevance') {
    return this.http.get<IResponse<IQuestion>>(`${this.baseUrl}/search`, {
      params: {
        tagged,
        page: page.toString(),
        pagesize: pageSize.toString(),
        order,
        sort
      }
    });
  }

  similar(title: string, page: number = 1, pageSize: number = 10, order: string = 'desc', sort: string = 'relevance') {
    return this.http.get<IResponse<IQuestion>>(`${this.baseUrl}/similar`, {
      params: {
        title,
        page: page.toString(),
        pagesize: pageSize.toString(),
        order,
        sort
      }
    });
  }

  userQuestions(id: number) {
    return this.http.get<IResponse<IQuestion>>(`${this.baseUrl}/users/${id}/questions`, {
      params: { pagesize: '3', order: 'desc', sort: 'votes' }
    });
  }
}
