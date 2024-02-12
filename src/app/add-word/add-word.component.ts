import { Component } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { Subscription } from 'rxjs';

import { Vocabulary } from '../vocabulary.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrl: './add-word.component.scss'
})
export class AddWordComponent {

  private addFoodSubscription?: Subscription;
  vocabulary!: Vocabulary
  constructor(
    private vocabularyService: VocabularyService,
    private router: Router,

  ) {

    this.vocabulary = {
      english_word: '',
      thai_word: '',
    };
  }

  onFormSubmit() {
    this.vocabularyService.addData(this.vocabulary)
      .subscribe({
        next: (response) => {
          console.log('Data added successfully:', response);
          // ทำอย่างอื่น ๆ ที่คุณต้องการหลังจากเพิ่มข้อมูล
          // เช่น นำผู้ใช้ไปยังหน้าอื่น ๆ หรือแสดงข้อความยืนยัน
        },
        error: (error) => {
          if (error.status === 400 && error.error && error.error.message) {
            console.error('Validation error:', error.error.message);
            // แสดงข้อความแจ้งเตือนผู้ใช้เกี่ยวกับข้อผิดพลาดทางด้านการตรวจสอบ
          } else {
            // จัดการกับข้อผิดพลาดอื่น ๆ
            console.error('Error:', error);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.addFoodSubscription?.unsubscribe();
  }


  addData() {
    const data = {
      english_word: 'English Word',
      thai_word: 'Thai Word'
    };

    this.vocabularyService.addData(data).subscribe(response => {
      console.log(response);
      // ทำอย่างอื่นๆ ที่คุณต้องการหลังจากการเพิ่มข้อมูล
    });
  }
}

