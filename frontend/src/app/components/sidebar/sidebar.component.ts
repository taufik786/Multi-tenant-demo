import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule],
})
export class SidebarComponent {
  routes: any = [
    {
      parent: 'Dashboard',
      children: [
        {
          child: 'Users',
          subchildren: ['Add', 'Edit', 'Delete'],
        },
        {
          child: 'Settings',
          subchildren: ['Profile', 'Security'],
        },
      ],
    },
    {
      parent: 'Reports',
      children: [
        {
          child: 'Sales',
          subchildren: [],
        },
        {
          child: 'Inventory',
          subchildren: ['Check Stock', 'Add Item'],
        },
      ],
    },
    {
      parent: 'Notifications',
      children: [],
    },
    {
      parent: 'Help',
      children: [
        {
          child: 'FAQ',
          subchildren: [],
        },
      ],
    },
    {
      parent: 'Admin',
      children: [
        {
          child: 'Roles',
          subchildren: ['Create Role', 'Assign Permission'],
        },
      ],
    },
    {
      parent: 'Settings',
      children: [],
    },
  ];
  constructor(private userServices: UserService, private router: Router) {}

  ngOnInit(): void {
    const parts = window.location.hostname.split('.');
    const subdomain = parts.length > 1 ? parts[0] : null;
    console.log('Subdomain:', subdomain);
    this.userServices.getUserLayout(subdomain).subscribe((data: any) => {
      console.log(data);
      this.routes = data.routes;
      localStorage.setItem("org", data.routes[0].orgId._id)
    });
  }

  goToPage(parent: string, child: string, sub: string) {
    // You can define your route pattern here
    // console.log('Navigating to:', parent, child, sub);
    // console.log(`'Navigating to:', /page/${parent}/${child}/${sub}`);
    this.router.navigate([`/page/${parent}/${child}/${sub}`]);
  }
}
