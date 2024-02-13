import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Users, Vocabulary } from './vocabulary.model';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  private baseUrl = 'http://localhost/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getAllVocabularies(): Observable<Vocabulary[]> {
    return this.http.get<Vocabulary[]>(this.baseUrl + 'api.php');
  }
  getVocabularyCount(): Observable<Vocabulary[]> {
    return this.http.get<Vocabulary[]>(this.baseUrl + 'get_word_count.php');
  }

  getUseryCount(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseUrl + 'get_user_count.php');
  }
  saveData(data: any) {
    return this.http.post(this.baseUrl + 'add_word.php', data);
  }
  deleteData(id: number){
    return this.http.delete<Vocabulary>(this.baseUrl + "delete.php?id=" + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

//   deleteData(id: any) {
//     const params = new HttpParams()
//       .set('id', id.toString());

//     return this.http.delete(`${this.baseUrl}/delete`, { params: params });
// }

  addData(data: Vocabulary): Observable<any> {
    console.log('adddaaaaaata', data);
    return this.http.post(this.baseUrl+`add.php`, data);
  }

  getVocabularyById(id: string): Observable<Vocabulary> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Vocabulary>(url);
  }

  updateVocabulary(vocabulary: Vocabulary): Observable<any> {
    const url = `${this.baseUrl}/${vocabulary.id}`;
    return this.http.put(url, vocabulary);
  }
}
