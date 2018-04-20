import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSortModule, MatStepperModule,
  MatTabsModule, MatTableModule, MatToolbarModule, MatTooltipModule, MatExpansionModule
} from '@angular/material';

@NgModule({
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule, MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule, MatInputModule,
    MatListModule,
    MatMenuModule,
    MatOptionModule,
    MatProgressBarModule, MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSortModule, MatStepperModule,
    MatTableModule, MatToolbarModule
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule, MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule, MatInputModule,
    MatListModule,
    MatMenuModule,
    MatOptionModule,
    MatProgressBarModule, MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSortModule, MatStepperModule,
    MatTabsModule, MatTableModule, MatToolbarModule, MatTooltipModule
  ]
})
export class MaterialModule { }
