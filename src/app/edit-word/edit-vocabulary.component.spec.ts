import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVocabularyComponent } from './edit-vocabulary.component';

describe('EditWordComponent', () => {
  let component: EditVocabularyComponent;
  let fixture: ComponentFixture<EditVocabularyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditVocabularyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditVocabularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
