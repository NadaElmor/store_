import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "../Components/home/home.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from "../Components/navbar/navbar.component";




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, NgxPaginationModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'store';
}
