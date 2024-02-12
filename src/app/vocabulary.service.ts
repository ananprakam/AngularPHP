import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users, Vocabulary } from './vocabulary.model';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  private baseUrl = 'http://localhost/test/';

  constructor(private http: HttpClient) { }

  getAllVocabularies(): Observable<Vocabulary[]> {
    return this.http.get<Vocabulary[]>(this.baseUrl+'api.php');
  }
  getVocabularyCount(): Observable<Vocabulary[]> {
    return this.http.get<Vocabulary[]>(this.baseUrl+'get_word_count.php');
  }

  getUseryCount(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseUrl+'get_user_count.php');
  }
  saveData(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'edit_word.php', data);
  }

  deleteData(id: number): Observable<any> {
    debugger
    console.log(id)
    const url = `${this.baseUrl}/delete.php?id=${id}`;
    return this.http.delete<any>(url);
  }
  

  addData(data: Vocabulary): Observable<Vocabulary> {
    
    console.log('adddata',data)
    return this.http.post<Vocabulary>(this.baseUrl+'add_word.php', data);
  }

  
}
