import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vocabulary } from './vocabulary.model';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  private baseUrl = 'http://localhost/test/';

  constructor(private http: HttpClient) { }

  getAllVocabularies(): Observable<Vocabulary[]> {
    return this.http.get<Vocabulary[]>(this.baseUrl+'api.php');
  }

  createVocabulary(vocabulary: Vocabulary): Observable<any> {
    return this.http.post(`${this.baseUrl}/create.php`, vocabulary);
  }

  updateVocabulary(vocabulary: Vocabulary): Observable<any> {
    return this.http.put(`${this.baseUrl}/update.php`, vocabulary);
  }

  deleteVocabulary(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete.php?id=${id}`);
  }
}
