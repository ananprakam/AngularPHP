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
  vocabulary: any = {}; // ตัวอย่างข้อมูลเริ่มต้น
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private vocabularyService: VocabularyService, private router: Router) {}

  onFormSubmit() {
    this.vocabularyService.addData(this.vocabulary).subscribe({
      next: (response) => {
        if (response.msg === "There is already an English word") {
          // แสดงข้อความข้อผิดพลาดที่ระบุว่ามีคำภาษาอังกฤษซ้ำ
          this.errorMessage = 'There is already an English word';
          this.successMessage = null;
        } else {
          // แสดงข้อความสำเร็จและนำผู้ใช้ไปยังหน้ารายการคำศัพท์
          this.successMessage = response.msg;
          this.errorMessage = null;
          setTimeout(() => {
            this.router.navigate(['/vocabulary-list']);
          }, 2000); // รอ 2 วินาทีก่อนนำทาง
        }
      },
      error: (error) => {
        // จัดการข้อผิดพลาดอื่นๆ
        console.error('Error:', error);
        // แสดงข้อความข้อผิดพลาดทั่วไปแก่ผู้ใช้
        this.errorMessage = 'An error occurred while processing your request.';
        this.successMessage = null;
      },
    });
  }
  
  
  
  goBack(): void {
    
      this.router.navigate(['/vocabulary-list']);
    
  }
  
}
