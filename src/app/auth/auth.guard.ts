import { Injectable, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticatedOrRefresh) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/login');
};
