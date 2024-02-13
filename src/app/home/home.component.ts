import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
userCount: number = 0;
vocabularyCount  : number = 0;
constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getVocabularyCount();
    this.getUseryCount();
  }


  getUseryCount(): void {
    this.http.get<any>('http://localhost/api/get_user_count.php').subscribe(
      responses => {
        this.userCount = responses.user_count;
        console.log(this.userCount);
        console.log(responses.user_count);
        console.log(responses);
      },
      error => {
        console.log('Error occurred:', error);
      }
    );
  }

  getVocabularyCount(): void {
    this.http.get<any>('http://localhost/api/get_word_count.php').subscribe(
      responses => {
        this.vocabularyCount = responses.vocabulary_count;
        console.log(this.vocabularyCount);
        console.log(responses.vocabulary_count);
        console.log(responses);
      },
      error => {
        console.log('Error occurred:', error);
      }
    );
  }

}
