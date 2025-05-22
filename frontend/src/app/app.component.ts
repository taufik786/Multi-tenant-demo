import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  ngOnInit() {
    // Initialize any necessary data or services here
//     const username = prompt("Enter username:");
// const password = prompt("Enter password:");

// if (username === 'admin' && password === '1234') {
//   alert("Login successful!");
// } else {
//   alert("Invalid credentials.");
// }

  }
}
