import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';

  constructor(public postService: PostService) {}

  ngOnInit(): void {}

  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    this.postService.addPost(postForm.value.title, postForm.value.content);
    postForm.resetForm();
  }
}
