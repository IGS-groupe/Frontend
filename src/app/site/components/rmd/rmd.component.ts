// rmd.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rmd',
  templateUrl: './rmd.component.html',
  styleUrls: ['./rmd.component.scss']
})
export class RMDComponent implements OnInit {
  /** Number of clients served — replace with real data later */
  clientCount: number = 1234;

  constructor() { }

  ngOnInit(): void {
    // TODO: fetch real client count from your service/API instead of using the hard‑coded value
  }
}
