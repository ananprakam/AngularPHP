import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseUrl + 'api_users.php');
  }

  deleteUser(userId: number): Observable<any> {

    const url = `${this.baseUrl}delete_users.php`; // Constructing URL using baseUrl
    return this.http.post<any>(url, { id: userId });
  }

  getUseryCount(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseUrl + 'get_user_count.php');
  }
  saveData(data: any) {
    return this.http.post(this.baseUrl + 'add_word.php', data);
  }
  deleteData(id: number) {
    return this.http.delete<Vocabulary>(this.baseUrl + "delete.php?id=" + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  addData(data: Vocabulary): Observable<{msg:string,msgg:string}> {
   console.log('data:', data);
    return this.http.post<{msg:string,msgg:string}>(this.baseUrl + `add_word.php`, data); 
  }


  getVocabularyById(id: number): Observable<Vocabulary> {
    const url = `${this.baseUrl}update_word.php?id=${id}`;
    return this.http.get<Vocabulary>(url);
}


  updateVocabulary(vocabulary: Vocabulary): Observable<any> {
    const url = `${this.baseUrl}/${vocabulary.id}`;
    return this.http.put(url, vocabulary);
  }

  saveVocabulary(vocabulary: Vocabulary): Observable<any> {
    const url = `${this.baseUrl}update_word.php`;
    return this.http.post(url, vocabulary);
  }
}
