import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { RegisterComponent } from '../Components/register/register.component';
import { HomeComponent } from '../Components/home/home.component';
import { LoginComponent } from '../Components/login/login.component';
import { CartComponent } from '../Components/cart/cart.component';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  
];

export const appConfig = {
  providers: [provideRouter(routes)]
};
