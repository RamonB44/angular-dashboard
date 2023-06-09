import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth.routing.module'

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule, AuthRoutingModule],
})
export class AuthModule {}
