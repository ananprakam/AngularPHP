import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http'; // นำเข้า HttpClient เพื่อใช้ส่งคำขอ HTTP ไปยัง API

export interface PeriodicElement {
  id?: number;
  english_word?: string ;
  thai_word?: string ;
}

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'english_word', 'thai_word'];
  dataSource = new MatTableDataSource<PeriodicElement>(); // ไม่ต้องกำหนดค่าเริ่มต้นเป็น ELEMENT_DATA

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) { } // ใส่ HttpClient ใน constructor

  ngAfterViewInit() {
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
}
