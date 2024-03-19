import { Component, OnInit, ViewChild } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../vocabulary.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.scss'],
})
export class VocabularyListComponent implements OnInit {
  vocabularies: Vocabulary[] = [];
  displayedColumns: string[] = [
    'id',
    'english_Word',
    'thai_Word',
    'edit',
    'delete',
  ];
  dataSource!: any;
  searchTerm: string = '';
  id?: number;

  data: any[] = [];

  error = '';
  success = '';

  resetAlerts() {
    this.error = '';
  }
  post: any;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private vocabularyService: VocabularyService,
    private spinerService: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.vocabularyService.getAllVocabularies().subscribe((data) => {
      this.post = data;
      this.dataSource = new MatTableDataSource<Vocabulary>(this.post);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
    this.getAllVocabularies();
    this.getData();
  }

  getData() {
    this.vocabularyService.getAllVocabularies().subscribe((response: any) => {
      this.vocabularies = response;
    });
  }
  
 
  
  //Search DATA
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

  getAllVocabularies(): void {
    this.spinerService.show(); // แสดง spinner เมื่อกำลังโหลดข้อมูล
    this.vocabularyService.getAllVocabularies().subscribe({
      next: (data: Vocabulary[]) => {
        this.vocabularies = data;
        this.dataSource = new MatTableDataSource<Vocabulary>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.spinerService.hide(); // ซ่อน spinner เมื่อข้อมูลถูกโหลดเสร็จสมบูรณ์
      },
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
