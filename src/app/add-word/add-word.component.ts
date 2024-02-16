// ใน add-word.component.ts
import { Component } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../vocabulary.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
    this.vocabularyService.addData(this.vocabulary).subscribe({
      next: (response) => {
        if (response.msgg === "English word already exists") {
          // Display an error message indicating that the English word already exists
          Swal.fire({
            icon: 'error',
            text: 'มีคำภาษาอังกฤษอยู่แล้ว',
          });
        } else {
          // Display a success message and navigate to the vocabulary list
          Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: response.msg,
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/vocabulary-list']);
            }
          });
        }
      },
      error: (error) => {
        // Handle other errors
        console.error('Error:', error);
        // Optionally, you can display a generic error message to the user
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred while processing your request.',
        });
      },
    });
  }
  


  








  goBack(): void {
    
      this.router.navigate(['/vocabulary-list']);
    
  }
  
}
