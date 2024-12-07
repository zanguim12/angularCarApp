//  import { HttpClient } from '@angular/common/http'
//  import { Injectable } from '@angular/core'
//  import { map, Observable } from 'rxjs'

//  interface User{
//    id:string;
//    email:string;
//    name:string;
//    password:string;
//    role:string;
//  }

//  @Injectable({
//   providedIn: 'root'
//  })
//  export class AuthService {
//   constructor(private http: HttpClient) {}

//    private apiUrl = 'http://localhost:8080';

//    public register(name: string, email: string, password: string): Observable<any> {
//      const newUser = {
//        id: this.generateId(),
//       name,
//        email,
//      password,

//     };

//    return this.http.post<any>(`${this.apiUrl}/users`, newUser)
//      .pipe(
//         map(response => {
//           if (response) {
//             return { success: true, user: response };
//           } else {
//             return { success: false, message: 'Registration failed' };
//           }
//         })
//       );
//   }
//   private generateId(): string {
//      return Math.random().toString(36).substr(2, 9);
//   }

//   login(loginRequest: any): Observable<any> {
//      return this.http.get(`${this.apiUrl}/users`, loginRequest)
//   }
// login(loginRequest: any): Observable<any> {
//   return this.http.get<User[]>(`${this.apiUrl}/users`)
//     .pipe(
//       map((users) => {
//         const user = users.find(u =>
//           u.email === loginRequest.email &&
//           u.password === loginRequest.password
//         );

//         if (user) {
//           return {
//             userId: user.id,
//             userRole: user.role,
//             jwt: 'mock-jwt-token-' + user.id // Mock JWT token for testing
//           };
//         } else {
//           throw new Error('Invalid credentials');
//         }
//       })
//     );
// }
// // }

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'

interface User {
  id: string;
  email: string;
  name:string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /*register(signupRequest: any): Observable<any> {
    return this.http.post(${BASE_URL}/api/auth/signup, signupRequest)
  }*/
  private apiUrl = 'http://localhost:8080'
    private generateId(): string {
      return Math.random().toString(36).substr(2, 9);
    }

  public register(name: string, email: string, password: string, role: string = 'USER'): Observable<any> {
    const newUser = {
      id: this.generateId(),
      name,
      email,
      password,
      role
    };

    return this.http.post<any>(`${this.apiUrl}/users`, newUser)
      .pipe(
        map(response => {
          if (response) {
            return { success: true, user: response };
          } else {
            return { success: false, message: 'Registration failed' };
          }
        })
      );
  }

  login(loginRequest: any): Observable<any> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
      .pipe(
        map((users) => {
          const user = users.find(u =>
            u.email === loginRequest.email &&
            u.password === loginRequest.password
          );

          if (user) {
            return {
              userId: user.id,
              userRole: user.role,
              jwt: 'mock-jwt-token-' + user.id
            };
          } else {
            throw new Error('Invalid credentials');
          }
        })
      );
  }
}
