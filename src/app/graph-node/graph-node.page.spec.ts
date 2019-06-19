import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphNodePage } from './graph-node.page';

describe('GraphNodePage', () => {
  let component: GraphNodePage;
  let fixture: ComponentFixture<GraphNodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphNodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphNodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
