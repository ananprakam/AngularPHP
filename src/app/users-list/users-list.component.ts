import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../vocabulary.model';
import { VocabularyService } from '../vocabulary.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  
  users: Users[] = [];
  displayedColumns: string[] = ['id', 'username', 'email'];
  dataSource!: MatTableDataSource<Users>;
  searchTerm: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private vocabularyService: VocabularyService,
    private spinerService: NgxSpinnerService,
    private http: HttpClient) {}


  ngOnInit(): void {
    this.spinerService.show();

    setTimeout(() => {
      this.spinerService.hide();
    }, 1000);

    this.getAllUsers();
  }
  filterData(searchTerm: string) {
    if (!searchTerm) {
      return this.users;
    }
    return this.users.filter((users) => {
      // Check if vocabulary and vocabulary.english_word are defined
      if (users && users.username) {
        return users.username.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
  }

  getAllUsers(): void {
    this.vocabularyService.getAllUsers().subscribe(
      {
        next: (data: Users[]) => {
          this.users = data;
          this.dataSource = new MatTableDataSource<Users>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error: any) => {  
          console.log(error);
        }
      }
    );
  }

  deleteUser(userId: number | undefined) {
    if (userId !== undefined) {
      if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้รายนี้?')) {
        return; 
      }

      this.vocabularyService.deleteUser(userId)
        .subscribe(response => {
          console.log('ลบผู้ใช้เรียบร้อยแล้ว: ', response);
          
        }, error => {
          console.error('เกิดข้อผิดพลาดในการลบผู้ใช้: ', error);
        });
    } else {
      console.error('User ID is undefined');
    }
  }
  
}
