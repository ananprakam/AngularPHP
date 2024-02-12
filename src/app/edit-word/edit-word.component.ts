import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-word',
  templateUrl: './edit-word.component.html',
  styleUrl: './edit-word.component.scss'
})
export class EditWordComponent {
  email: string = '';
  password: string = '';

  submitForm() {
    // ทำสิ่งที่คุณต้องการเมื่อฟอร์มถูกส่ง
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}
