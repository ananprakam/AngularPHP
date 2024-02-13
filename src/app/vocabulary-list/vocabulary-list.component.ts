import { Component, OnInit, ViewChild } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../vocabulary.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

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
    , private router: Router) {
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


  
  // deletes(id: number) {
  //   this.vocabularyService.deleteData(id).subscribe((vocabularies: Vocabulary) => {
  //     console.log("Vocabulary deleted, ", vocabularies);
  //   });
  // }
  delete(id: number) {
    this.vocabularyService.deleteData(id).subscribe(res => {
      this.vocabularies = this.vocabularies.filter(item => item.id !== id);
      console.log('Customer deleted successfully!');
    })
  }

  // deletes(Id: number){
  //   debugger
  //   console.log('Id',Id);
  //   this.resetAlerts();
  //   this.vocabularyService.deleteData(Id).subscribe(
  //     (res) => {
  //       this.vocabularies = this.vocabularies.filter(function (vocabulary) {
  //         return vocabulary['id'] && +vocabulary['id'] !== +Id;
  //       });

  //       this.success = 'Deleted successfully';
  //     },
  //     (err) => (this.error = err)
  //   );
  // }



}
