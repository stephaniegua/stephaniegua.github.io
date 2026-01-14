import { Routes } from '@angular/router';

import { SchoolMapComponent } from './school-map/school-map';
import { ContactFormComponent } from './contact-form/contact-form';



export const routes: Routes = [{ path: '', component: SchoolMapComponent },
  { path: 'contact', component: ContactFormComponent },
];
