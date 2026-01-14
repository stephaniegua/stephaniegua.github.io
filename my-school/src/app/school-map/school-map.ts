import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { School } from '../services/school';
import { Router } from '@angular/router';
import { SchoolDetail } from '../school-detail/school-detail';
import * as L from 'leaflet';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-school-map',
  standalone: true,
  imports: [CommonModule, SchoolDetail, FormsModule],
  styleUrls: ['./school-map.css'],
  template: `
    <h2>Carte des établissements</h2>

    <div class="filters">
       <label>Filtrer par type :</label>
       <select [(ngModel)]="selectedType" (change)="updateMarkers()"> 
         <option *ngFor="let t of types" [value]="t">{{ t }}</option> 
      </select> </div>

    <div id="map" style="height: 400px; margin-bottom: 20px;"></div>

    <app-school-detail [school]="selectedSchool"></app-school-detail>`,
})
export class SchoolMapComponent implements AfterViewInit {

  private service = inject(School);
  private router = inject(Router);

  schools: any[] = [];
  markerLayer: any;
  selectedSchool: any = null;
  selectedType: string = 'all';
  types: string[] = [];
  map: any;

  //  Dictionnaire d’icônes
  icons: any = {
    'Ecole primaire': L.icon({
      iconUrl: 'assets/icons/school.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    }),
    'Collège': L.icon({
      iconUrl:'assets/icons/college.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    }),
    'Lycée': L.icon({
      iconUrl:'assets/icons/graduation.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    }),
    'default': L.icon({
      iconUrl:'assets/icons/prototype.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    })
  };
normalizeType(type: string): string {
  if (!type) return 'default';

  const t = type.toLowerCase();

  if (t.includes('école') || t.includes('ecole')) return 'Ecole primaire';
  if (t.includes('collège') || t.includes('college')) return 'Collège';
  if (t.includes('lycée') || t.includes('lycee')) return 'Lycée';

  return 'default';
}

  ngAfterViewInit() {
    this.initMap();
  }

  //Une méthode ne doit jamais être définie dans une autre méthode

  initMap() {//Elle sert à initialiser ta carte Leaflet : 
             // fond de carte + groupe de marqueurs + premiers marqueurs.

    this.map = L.map('map').setView([43.6045, 1.4442], 12);
    //Définit la position initiale et le zoom stocke dans une constante locale map.

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);//.addTo(map) ajoute une couche de tuiles à la carte que tu viens de créer.

    this.markerLayer = L.layerGroup().addTo(this.map);
  
    this.service.getSchoolsByCity('Toulouse').subscribe((schools: any[]) => {
      //getSchoolsByCity('Toulouse') appelle API et retourne un Observable qui émet une liste d’écoles.
      this.schools = schools;//stocke les écoles reçues dans la propriété this.schools du composant.
      //sont réutilisable ailleurs :pour les filtres,pour les détails,pour les marqueurs

      console.log("Données complètes:", schools);
      // Génère automatiquement la liste des types 
      this.types = [ 'all',
       ...Array.from(new Set(schools.map(s => s.type))).sort() ];//sort()Trie les types par ordre alphabétique.

      this.updateMarkers(); // ←  méthode pour afficher les marqueurs 
      });
    
      
      this.schools.forEach(school => {
    // Vérifie que les coordonnées existent
      if (!school.lat || !school.lng) return;

      const lat = school.lat;
      const lon = school.lng;

    // Normalisation du type pour choisir l’icône
      const normalizedType = this.normalizeType(school.type);
      const icon = this.icons[normalizedType];

    // Création du marqueur
      const marker = L.marker([lat, lon], { icon }).addTo(this.map);

    // Popup + sélection
      marker.on('click', () => {
      this.selectedSchool = school; // plus school.fields
      console.log("École sélectionnée :", school);

    });
  });
  };
  updateMarkers() { 
    if (!this.markerLayer) return;

    // Efface les anciens markers
    this.markerLayer.clearLayers(); 

    // Filtrage par type
    const filtered = this.selectedType === 'all' 
    ? this.schools : this.schools.filter(s => s.type === this.selectedType); 

    // Ajoute les markers filtrés
    filtered.forEach(school => { if (!school.lat || !school.lng) return; 
      const normalized = this.normalizeType(school.type); 
      const icon = this.icons[normalized] || this.icons['default']; 

      const marker = L.marker([school.lat, school.lng], { icon }) 
      .addTo(this.markerLayer) 
      .on('click', () => { 
        this.selectedSchool = school; 
      }); 
    }); 
  }
  }    
