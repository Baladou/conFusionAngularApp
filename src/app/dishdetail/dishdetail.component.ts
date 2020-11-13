import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';

import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
 // @Input()  //supply info from a comp to this comp
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  @ViewChild('Cform') commentFormDirective;
  commentForm: FormGroup;
  comment: Comment;
  formErrors = {
    'author': '',
    'comment': ''
   
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.'
    },
    'comment': {
      'required':      'Last Name is required.'
      
    }
  };

  
  
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject('BaseURL') private BaseURL,
    private fb: FormBuilder,
    ) {   this.createForm();}

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => 
      this.dishIds = dishIds);
    this.route.params.pipe(switchMap(
      (params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; 
      this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
   
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)] ],
      comment: ['', [Validators.required] ],
      rating: ['5']
     
      
    });
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));  

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    this.comment.date = Date();
    this.dish.comments.push(this.comment);
   
    this.commentForm.reset({
      author: '',
      rating: ['5'],
      
      comment: ''
    });
    //reset the whole form to not have errors after resiting the form
    this.commentFormDirective.resetForm();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
