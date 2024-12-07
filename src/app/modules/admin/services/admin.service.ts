import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { StorageService } from '../../../auth/services/storage/storage.service'

const BASIC_URL = 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  postCar(carDto: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/cars`, carDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllCars(): Observable<any> {
    return this.http.get(`${BASIC_URL}/cars`, {
      headers: this.createAuthorizationHeader()
    })
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${BASIC_URL}/cars/${id}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  getCarById(id: number): Observable<any> {
    return this.http.get(`${BASIC_URL}/cars/${id}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  updateCar(carId: number, carDto: any): Observable<any> {
    return this.http.put(`${BASIC_URL}/cars/${carId}`, carDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getCarBookings(): Observable<any> {
    return this.http.get(`${BASIC_URL}/bookings`, {
      headers: this.createAuthorizationHeader()
    })
  }

  changeBookingStatus(bookingId: number, status: string): Observable<any> {
    return this.http.get(
      `${BASIC_URL}/bookings/${bookingId}/${status}`,
      {
        headers: this.createAuthorizationHeader()
      }
    )
  }

  searchCar(searchDto: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/cars/search`, searchDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders()

    return authHeaders.set(
      'Authorization',
      `Bearer ${StorageService.getToken()}`
    )
  }
}
