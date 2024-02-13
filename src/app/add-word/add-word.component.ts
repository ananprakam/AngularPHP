// ใน add-word.component.ts
import { Component } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../vocabulary.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent {
  vocabulary: Vocabulary = { english_word: '', thai_word: '' };

  constructor(
    private vocabularyService: VocabularyService,
    private router: Router
  ) {}

  onFormSubmit() {
    console.log('Form submitted. Vocabulary:', this.vocabulary);
    this.vocabularyService.addData(this.vocabulary).subscribe({
      next: (response) => {
        console.log('Data added successfully:', response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
  
}
