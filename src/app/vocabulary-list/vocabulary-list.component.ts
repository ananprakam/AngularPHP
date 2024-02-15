import { Component, OnInit, ViewChild } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../vocabulary.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.scss']
})
export class VocabularyListComponent implements OnInit {
  vocabularies: Vocabulary[] = [];
  displayedColumns: string[] = ['id', 'english_Word', 'thai_Word'];
  dataSource!: any;
  searchTerm: string = '';
  id?: number;

  error = '';
  success = '';

  resetAlerts() {
    this.error = '';
  }

  post: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private vocabularyService: VocabularyService
    , private spinerService: NgxSpinnerService
    , private router: Router,
    private toastr: ToastrService) {
    this.vocabularyService.getAllVocabularies().subscribe((data => {
      this.post = data;
      this.dataSource = new MatTableDataSource<Vocabulary>(this.post);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }))
  }


  ngOnInit(): void {
    this.spinerService.show();

    setTimeout(() => {
      this.spinerService.hide();
    }, 1000);

    this.getAllVocabularies();
  }
  
  //Search DATA
  filterData(searchTerm: string) {
    if (!searchTerm) {
      return this.vocabularies;
    }
    return this.vocabularies.filter((vocabulary) => {
      // Check if vocabulary and vocabulary.english_word are defined
      if (vocabulary && vocabulary.english_word) {
        return vocabulary.english_word.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
  }


  getAllVocabularies(): void {
    this.vocabularyService.getAllVocabularies().subscribe(
      {
        next: (data: Vocabulary[]) => {
          this.vocabularies = data;
          this.dataSource = new MatTableDataSource<Vocabulary>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error: any) => {
          console.log(error);
        }
      }
    );
  }

  onDelete(id: number | undefined): void {
    this.spinerService.show();

   
    if (id !== undefined) { // ตรวจสอบให้แน่ใจว่าค่าไม่ใช่ undefined
      if (confirm('Are you sure you want to delete this vocabulary?')) {
        this.vocabularyService.deleteData(id).subscribe({
          next: () => {
            // ลบคำศัพท์ออกจากคอลเล็กชันหลังจากลบข้อมูลในเซิร์ฟเวอร์เรียบร้อยแล้ว
            this.vocabularies = this.vocabularies.filter((vocabulary) => vocabulary.id !== id);
            this.toastr.success('Vocabulary deleted successfully');
            setTimeout(() => {
              this.spinerService.hide();
            }, 1000);
            this.router.navigate(['/vocabulary-list']);
          },
          error: (error) => {
            console.error('Error deleting vocabulary:', error);
            // Handle error, e.g., display error message
          }
        });
      }
    }
  }
  
}
