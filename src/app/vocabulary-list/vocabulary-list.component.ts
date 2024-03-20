import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http'; // นำเข้า HttpClient เพื่อใช้ส่งคำขอ HTTP ไปยัง API
import Swal from 'sweetalert2';
import { VocabularyService } from '../vocabulary.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

export interface Vocabulary {
  id?: number;
  english_word?: string;
  thai_word?: string;
}

@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.scss'],
})
export class VocabularyListComponent implements OnInit {
  vocabularies: Vocabulary[] = [];
  displayedColumns: string[] = ['id', 'english_word', 'thai_word', 'actions1', 'actions2'];
  dataSource = new MatTableDataSource<Vocabulary>();
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient,
    private vocabularyService: VocabularyService,
    private spinerService: NgxSpinnerService,
    private router: Router,) {} 

  ngOnInit() {
    this.loadElements(); // เรียกใช้งานเมื่อคอมโพเนนต์ถูกสร้าง
  }

  loadElements() {
    this.spinerService.show(); // แสดง Spinner
    const apiUrl = 'http://localhost/api/api.php';
    this.http.get<Vocabulary[]>(apiUrl).subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.spinerService.hide(); // ซ่อน Spinner เมื่อโหลดข้อมูลเสร็จสิ้น
      },
      (error) => {
        console.log('Error fetching data:', error);
        this.spinerService.hide(); // ซ่อน Spinner เมื่อเกิดข้อผิดพลาด
      }
    );
  }
  

  applyFilter() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }
  


  onDelete(id: number | undefined): void {
    if (id !== undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.vocabularyService.deleteData(id).subscribe({
            next: () => {
              this.vocabularies = this.vocabularies.filter(
                (vocabulary) => vocabulary.id !== id
              );
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              }).then(() => {
                window.location.reload(); // Reload the page after deletion
              });
  
              this.router.navigate(['/vocabulary-list']);
            },
            error: (error) => {
              console.error('Error deleting vocabulary:', error);
              // Handle error, e.g., display error message
            },
          });
        } else {
          this.spinerService.hide();
        }
      });
    }
  }
  
}
