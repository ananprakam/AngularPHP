import { Component, OnInit, ViewChild } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../vocabulary.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.scss']
})
export class VocabularyListComponent implements OnInit {
  vocabularies: Vocabulary[] = [];
  displayedColumns: string[] = ['id', 'english_Word', 'thai_Word'];
  dataSource!: MatTableDataSource<Vocabulary>;

post : any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private vocabularyService: VocabularyService) { 
    this.vocabularyService.getAllVocabularies().subscribe((data => {
      this.post = data;
      this.dataSource= new MatTableDataSource(this.post);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }))
  }


  ngOnInit(): void {
    this.getAllVocabularies();
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
}
