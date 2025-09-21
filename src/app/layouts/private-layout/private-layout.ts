import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '@shared/sidebar/sidebar';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [RouterOutlet, Sidebar],
  templateUrl: './private-layout.html',
  styleUrls: ['./private-layout.css']
})
export class PrivateLayout {

}
