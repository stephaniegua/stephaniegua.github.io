import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface School {
  id: string;
  name: string;
  address: string;
  type: string;
  status: string;
  lat: number;
  lng: number;

}


@Injectable({
  providedIn: 'root',
})
export class School {
  private http = inject(HttpClient);

  getSchoolsByCity(city: string): Observable<School[]> {
  return this.http
  .get<any>(
        `https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-annuaire-education&rows=200&refine.nom_commune=${city}`
      )
      .pipe(
        map(response =>
          response.records.map((record: any) => ({
            id: record.fields.identifiant_de_l_etablissement,
            name: record.fields.nom_etablissement,

            address:
              record.fields.adresse_1 ||
              record.fields.adresse_2 ||
              record.fields.adresse_3 ||
              "Adresse inconnue",

            type: record.fields.type_etablissement,

            status: record.fields.statut_public_prive || "Non renseigné",

            lat: record.fields.latitude,
            lng: record.fields.longitude
          }))
        )
      );
  }
}  