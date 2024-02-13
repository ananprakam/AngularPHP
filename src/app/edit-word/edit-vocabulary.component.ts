import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../vocabulary.model';

@Component({
  selector: 'app-edit-vocabulary',
  templateUrl: './edit-vocabulary.component.html',
  styleUrls: ['./edit-vocabulary.component.scss']
})
export class EditVocabularyComponent implements OnInit {
  vocabulary: Vocabulary = { english_word: '', thai_word: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vocabularyService: VocabularyService
  ) { }

  ngOnInit(): void {
    this.getVocabulary();
  }

  getVocabulary(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vocabularyService.getVocabularyById(id)
        .subscribe(vocabulary => this.vocabulary = vocabulary);
    }
  }

  onFormSubmit(): void {
    this.vocabularyService.updateVocabulary(this.vocabulary)
      .subscribe(() => {
        console.log('Vocabulary updated successfully');
       
      });
  }

  
}
