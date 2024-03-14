import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faBook, faLayerGroup, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
userCount: number = 0;
vocabularyCount  : number = 0;

faUser=faUser;
faLayerGroup=faLayerGroup;
faBook=faBook;

constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getVocabularyCount();
    this.getUseryCount();
  }


  getUseryCount(): void {
    this.http.get<any>('http://localhost/api/get_user_count.php').subscribe(
      responses => {
        this.userCount = responses.user_count;
        
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
        
      },
      error => {
        console.log('Error occurred:', error);
      }
    );
  }

}
