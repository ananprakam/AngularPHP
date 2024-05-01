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
        if (response.msgg === "มีคำภาษาอังกฤษอยู่แล้ว") {
          // แสดงข้อความข้อผิดพลาดที่ระบุว่ามีคำภาษาอังกฤษซ้ำ
          Swal.fire({
            icon: 'error',
            text: 'มีคำภาษาอังกฤษอยู่แล้ว',
          });
        } else {
          // แสดงข้อความสำเร็จและนำผู้ใช้ไปยังหน้ารายการคำศัพท์
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
        // จัดการข้อผิดพลาดอื่นๆ
        console.error('Error:', error);
        // ตัวเลือกที่จะแสดงข้อความข้อผิดพลาดทั่วไปแก่ผู้ใช้
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'เกิดข้อผิดพลาดขณะประมวลผลคำขอของคุณ',
        });
      },
    });
  }
  
  
  goBack(): void {
    
      this.router.navigate(['/vocabulary-list']);
    
  }
  
}
