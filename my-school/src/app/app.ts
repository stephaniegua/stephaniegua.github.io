import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';//un import TypeScript
import { FooterComponent } from './footer/footer';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],//import Angular standalone
  templateUrl: './app.html',//pour les gros templates (pages, formulaires, cartes…)ici ce n'est pas le cas, aurait pu être inline.
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('my-school');
}
