import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar color="accent">
      <span class="footer">© 2026 Annuaire Éducation - Mentions légales | CGU</span>
    </mat-toolbar>`,
  styleUrls: ['./footer.css']//Il n’existe qu’une seule propriété valide dans un composant :
  //styleUrls: string[]C’est toujours un tableau, même si tu n’as qu’un seul fichier CSS.



})
export class FooterComponent {}



