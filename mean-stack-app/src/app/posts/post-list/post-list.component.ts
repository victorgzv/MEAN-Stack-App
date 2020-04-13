import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  // posts = [
  //   {title: "First Post", content:"This is the first post´s content"},
  //   {title: "Seconds Post", content:"This is the second post´s content"},
  // ];
  @Input() posts = [];

  constructor() {}

  ngOnInit(): void {}
}
