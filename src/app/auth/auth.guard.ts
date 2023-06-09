import { Injectable, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  authService
  .isAuthenticatedOrRefresh()
  .then((isAuthenticated) => {
    if (isAuthenticated) {
      return true;
    }
    return router.parseUrl('/auth/login');
  });
};
