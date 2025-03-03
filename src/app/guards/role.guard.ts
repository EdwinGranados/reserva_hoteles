import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../interfaces/usuarios';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = localStorage.getItem('role');

  if (role === '1') {
    return true;
  } else {
    router.navigate(['/user']);
    return false;
  }
};
