import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http'; // นำเข้า HttpClient เพื่อใช้ส่งคำขอ HTTP ไปยัง API
import Swal from 'sweetalert2';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../vocabulary.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

export interface PeriodicElement {
  id?: number;
  english_word?: string;
  thai_word?: string;
}

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
})
export class TestListComponent implements OnInit {
  vocabularies: Vocabulary[] = [];
  displayedColumns: string[] = ['id', 'english_word', 'thai_word', 'actions1', 'actions2'];
  dataSource = new MatTableDataSource<PeriodicElement>(); // ไม่ต้องกำหนดค่าเริ่มต้นเป็น ELEMENT_DATA
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
    const apiUrl = 'http://localhost/api/api.php'; // ใส่ URL ของ API ที่ให้บริการข้อมูล
    this.http.get<PeriodicElement[]>(apiUrl).subscribe(
      (data) => {
        this.dataSource.data = data; // กำหนดข้อมูลให้กับ dataSource
        this.dataSource.paginator = this.paginator; // กำหนด paginator ให้กับ dataSource
      },
      (error) => {
        console.log('Error fetching data:', error);
      }
    );
  }

  filterData(searchTerm: string) {
    if (!searchTerm) {
      return this.vocabularies;
    }
    return this.vocabularies.filter((vocabulary) => {
      // Check if vocabulary and vocabulary.english_word are defined
      if (vocabulary && vocabulary.english_word) {
        return vocabulary.english_word
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
      return false;
    });
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
  
              this.router.navigate(['/test-list']);
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
