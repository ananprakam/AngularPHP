import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VocabularyListComponent } from './vocabulary-list/vocabulary-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { NavbarComponent } from './navbar/navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { EditWordComponent } from './edit-word/edit-word.component';
import { DeleteWordComponent } from './delete-word/delete-word.component';
import { AddWordComponent } from './add-word/add-word.component';

@NgModule({
  declarations: [
    AppComponent,
    VocabularyListComponent,
    NavbarComponent,
    HomeComponent,
    EditWordComponent,
    DeleteWordComponent,
    AddWordComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    NgxSpinnerModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
