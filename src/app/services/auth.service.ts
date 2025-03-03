import { Injectable } from '@angular/core';
import { Observable, of, ErrorObserver } from 'rxjs';
import { usuarios } from '../../data/MockDataUsuarios';
import { Role } from '../interfaces/usuarios';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private mockUser = usuarios;

  login(user: string, pass: string): Observable<any> {
    const userMatch = this.mockUser.find(({ userName, password }) => {
      return user == userName && pass == password;
    });
    const resp = new Observable((observer) => {
      if (!!userMatch) {
        return observer.next({
          token: `${userMatch.userName}_${userMatch.role}`,
          role:userMatch.role
        });
      } else {
        return observer.error({ error: 'Invalid credentials' });
      }
    });

    return resp
  }
}
