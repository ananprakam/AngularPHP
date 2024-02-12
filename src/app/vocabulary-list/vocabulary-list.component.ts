import { Component, OnInit, ViewChild } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../vocabulary.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.scss']
})
export class VocabularyListComponent implements OnInit {
  vocabularies: Vocabulary[] = [];
  displayedColumns: string[] = ['id', 'english_Word', 'thai_Word'];
  dataSource!: MatTableDataSource<Vocabulary>;
  searchTerm: string = '';
  Id? : number;
  

  post: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private vocabularyService: VocabularyService, private spinerService: NgxSpinnerService) {
    this.vocabularyService.getAllVocabularies().subscribe((data => {
      this.post = data;
      this.dataSource = new MatTableDataSource(this.post);
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
      return vocabulary.english_word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vocabulary.thai_word.toLowerCase().includes(searchTerm.toLowerCase());
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

  // deleteVocabulary(id: number) {
  //   debugger
  //   if (confirm('Are you sure you want to delete this vocabulary?')) {
  //     this.vocabularyService.deleteData(id).subscribe(response => {
  //       console.log('Vocabulary deleted successfully');
  //       // ทำอย่างอื่นๆ ที่คุณต้องการหลังจากการลบข้อมูล
  //     }, error => {
  //       console.error('Error deleting vocabulary:', error);
  //     });
  //   }
  // }


  deletes(Id?: number){
    debugger
    if (Id !== undefined) {
      this.vocabularyService.deleteData(Id).subscribe(
        () => {
          console.log('Vocabulary deleted successfully');
          // ทำอย่างอื่นๆ ที่คุณต้องการหลังจากการลบข้อมูล
        },
        error => {
          console.error('Error deleting vocabulary:', error);
        }
      );
    }
  }
  
}
