import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss']
})
export class DynamicPageComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  url = "";

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const parent = params.get('parent');
      const child = params.get('child');
      const sub = params.get('sub');
      console.log('Navigated to:', parent, child, sub);
      this.url = `/${parent}/${child}/${sub}`;
    });
  }
}
