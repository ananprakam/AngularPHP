import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VocabularyListComponent } from './vocabulary-list/vocabulary-list.component';
import { HomeComponent } from './home/home.component';
import { EditVocabularyComponent } from './edit-word/edit-vocabulary.component';
import { AddWordComponent } from './add-word/add-word.component';

const routes: Routes = [
  
  { path: '', component: HomeComponent }, // เส้นทางสำหรับหน้า Home
  { path: 'vocabulary-list', component: VocabularyListComponent },
  { path: 'edit-word', component:EditVocabularyComponent},
  { path: 'add-word', component:AddWordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
