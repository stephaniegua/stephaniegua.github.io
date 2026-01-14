import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule],
  template: `
    <mat-toolbar color="primary">
    <span class="left-spacer"></span>
      <span class="header">Annuaire Éducation</span>
      <span class="right-spacer"></span>
      <button mat-button routerLink="/">Accueil</button>
      <button mat-button routerLink="/contact">Contact</button>
    </mat-toolbar>`,
  
  styleUrls: ['./header.css']
})
export class HeaderComponent {}


