import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.scss',
})
export class CartModalComponent {
  router = inject(Router);

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
