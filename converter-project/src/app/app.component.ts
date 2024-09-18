import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UnitConverterComponent } from "./unit-converter/unit-converter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UnitConverterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mednet-coding-challenge-2024';
}
