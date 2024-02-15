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
      if (!confirm('Are you sure you want to delete this user?')) {
        return; // If the user cancels, do nothing
      }

      // Call the deleteUser method from the UserService
      this.vocabularyService.deleteUser(userId)
        .subscribe(response => {
          console.log('User deleted successfully:', response);
          // Handle success, e.g., show a success message or update UI
        }, error => {
          console.error('Error deleting user:', error);
          // Handle error, e.g., show an error message
        });
    } else {
      console.error('User ID is undefined');
      // Handle the case where userId is undefined, e.g., show an error message
    }
  }
  
}
