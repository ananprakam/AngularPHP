import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../vocabulary.model';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-vocabulary',
  templateUrl: './edit-vocabulary.component.html',
  styleUrls: ['./edit-vocabulary.component.scss']
})
export class EditVocabularyComponent implements OnInit {
  vocabulary?: Vocabulary;
  id: number | null = null; // Change type to number

  paramsSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vocabularyService: VocabularyService,
    private toster: ToastrService
  ) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        const idString = params.get('id');
        if (idString) {
          this.id = +idString; // Convert string to number
          this.vocabularyService.getVocabularyById(this.id).subscribe({
            next: (response) => {
              this.vocabulary = response;

            },
            error: (error: any) => {
              console.error('Error fetching vocabulary:', error);
              // Handle error, e.g., redirect to error page or display a message
            }
          });
        }
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/vocabulary-list']);
  }
  onFormSubmit(): void {
    if (this.vocabulary) {
      this.vocabularyService.saveVocabulary(this.vocabulary).subscribe({
        next: (response) => {
          this.toster.success('Data added successfully');
          this.router.navigate(['/vocabulary-list']);
        },
        error: (error: any) => {
          console.error('Error saving vocabulary:', error);
        }
      });
    }
  }
  updateVocabulary(): void {
    if (this.vocabulary) {
      this.vocabularyService.updateVocabulary(this.vocabulary).subscribe({
        next: (response) => {
          console.log('Update successful:', response);
          // Handle successful update, e.g., display success message
        },
        error: (error: any) => {
          console.error('Error updating vocabulary:', error);
          // Handle error, e.g., display error message
        }
      });
    }
  }
}
