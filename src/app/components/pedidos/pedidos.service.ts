import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, catchError } from 'rxjs/operators';

export interface Cidades {
  city: string;
  latitude: number;
  longitude: number;
}

export interface Paises {
  country: string;
  cities: Cidades[];
}

const baseUrl = 'https://servejsoneoc.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-erro'] : ['msg-success'],
    });
  }

  getCountries() {
    return this.http.get<Paises[]>(`${baseUrl}/countries`).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  computeDistance(origin: Cidades, destination: Cidades): number {
    const EARTH_RADIUS = 6_371.071; // Earth
    const diffLatitudeRadians = degreesToRadians(
      destination.latitude - origin.latitude
    );
    const diffLongitudeRadians = degreesToRadians(
      destination.longitude - origin.longitude
    );
    const originLatitudeRadians = degreesToRadians(origin.latitude);
    const destinationLatitudeRadians = degreesToRadians(destination.latitude);
    const kmDistance =
      2 *
      EARTH_RADIUS *
      Math.asin(
        Math.sqrt(
          Math.sin(diffLatitudeRadians / 2) *
            Math.sin(diffLatitudeRadians / 2) +
            Math.cos(originLatitudeRadians) *
              Math.cos(destinationLatitudeRadians) *
              Math.sin(diffLongitudeRadians / 2) *
              Math.sin(diffLongitudeRadians / 2)
        )
      );
    return kmDistance;
  }

  //retorna mesagem de erro
  errorHandler(e: any): Observable<any> {
    this.showMessage(`Ocorreu um erro! `, true);
    return EMPTY;
  }
}

function degreesToRadians(degreeValue: number) {
  return degreeValue * (Math.PI / 180);
}
