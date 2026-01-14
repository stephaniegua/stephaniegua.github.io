import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';// import TypeScript


@Component({
  selector: 'app-school-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],//import Angular standalone
    template: `
    <mat-card *ngIf="school">
      <mat-card-title>{{ school.name }}</mat-card-title>
      <mat-card-content>
        <p><strong>Adresse :</strong> {{ school.address }}</p>
        <p><strong>Type :</strong> {{ school.type }}</p>
        <p><strong>Status :</strong> {{ school.status }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['/contact']">
          Contact
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})

  

export class SchoolDetail {
@Input() school: any; // reçoit l'établissement sélectionné
}
