import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  constructor(public postService: PostService) {}
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

  ngOnInit(): void {
    this.postService.getPosts();
    this.postsSub = this.postService
      .getPostUdatedListener()
      .subscribe((post: Post[]) => {
        this.posts = post;
      });
  }
}
