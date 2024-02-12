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
  }

  getVocabularyCount(): void {
    this.http.get<any>('http://localhost/test/get_word_count.php').subscribe(
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



  getva(): void {
    this.http.get<any>('http://localhost/test/get_word_count.php').subscribe(
      responsea => {
        this.userCount = responsea.user_count;
      },
      error => {
        console.log('Error occurred:', error);
      }
    );
  }
}
