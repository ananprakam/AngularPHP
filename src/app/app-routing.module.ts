import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VocabularyListComponent } from './vocabulary-list/vocabulary-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // เรียกใช้หน้า Home เมื่อเข้าระบบครั้งแรก
  { path: 'home', component: HomeComponent }, // เส้นทางสำหรับหน้า Home
  { path: 'vocabulary-list', component: VocabularyListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
