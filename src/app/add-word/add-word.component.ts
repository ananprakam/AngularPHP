// ใน add-word.component.ts
import { Component } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../vocabulary.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent {
  vocabulary: Vocabulary = { english_word: '', thai_word: '' };

  constructor(
    private vocabularyService: VocabularyService,
    private router: Router,
    private toster: ToastrService
  ) {}

  onFormSubmit() {
    console.log('Form submitted. Vocabulary:', this.vocabulary);
    this.vocabularyService.addData(this.vocabulary).subscribe({
      next: (response) => {
        this.toster.success('Data added successfully');
        this.router.navigate(['/vocabulary-list']);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
  
}
