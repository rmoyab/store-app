import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recover', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'products/:categoryId', component: ProductListComponent },
  { path: 'product/:productId', component: ProductDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
