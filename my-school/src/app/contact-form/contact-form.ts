import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
/* j'importe MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, ces modules injectent automatiquement :
marges, padding, bordures, animations, couleurs, polices, layout, même sans CSS perso, mon formulaire a déjà un style Material Design.*/

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Nom" formControlName="lastName">
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Prénom" formControlName="firstName">
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Email" formControlName="email">
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Objet" formControlName="subject">
      </mat-form-field>
      <mat-form-field>
        <textarea matInput placeholder="Message" formControlName="message"></textarea>
      </mat-form-field>
      <mat-checkbox formControlName="acceptCGU">J'accepte les CGU</mat-checkbox>
      <button mat-raised-button color="primary" type="submit">Valider</button>
    </form>`,
  styleUrls: ['./contact-form.css']
})
export class ContactFormComponent {
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    acceptCGU: new FormControl(false, Validators.requiredTrue),
  });

  onSubmit() {
    if (this.form.valid) {
      console.log('Formulaire soumis', this.form.value);
    }
  }
}

