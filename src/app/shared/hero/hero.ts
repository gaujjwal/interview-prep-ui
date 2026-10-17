import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero',

  standalone: true,

  imports: [
    MatIconModule
  ],

  templateUrl: './hero.html',
  styleUrl: './hero.css'
})

export class HeroComponent {

}