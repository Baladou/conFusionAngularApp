import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { visibility } from '../animations/app.animation';
import { flyInOut,expand } from '../animations/app.animation';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
<<<<<<< HEAD
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
=======

>>>>>>> parent of 030993e... RxJS Part 2
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [ visibility(), flyInOut(),expand()]
})
export class DishdetailComponent implements OnInit {
  
 // @Input()  //supply info from a comp to this comp
  dish: Dish;
<<<<<<< HEAD
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;
<<<<<<< HEAD

  dishcopy: Dish;
  visibility = 'shown';

=======
>>>>>>> parent of 213f8b9... Saving Changes to Server
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

=======
>>>>>>> parent of 030993e... RxJS Part 2
  
  
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject('BaseURL') private BaseURL,
    private fb: FormBuilder,
    ) {  }

  ngOnInit() {
<<<<<<< HEAD
    this.createForm();
    this.dishservice.getDishIds().subscribe(dishIds => 
      this.dishIds = dishIds);
<<<<<<< HEAD
      this.route.params.pipe(switchMap((params: Params) => {
         this.visibility = 'hidden'; 
      return this.dishservice.getDish(params['id']); }))
      .subscribe(dish => { this.dish = dish; 
        this.dishcopy = dish; this.setPrevNext(dish.id);
        this.visibility = 'shown'; },
        errmess => this.errMess = <any>errmess);
=======
    this.route.params.pipe(switchMap(
      (params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; 
      this.setPrevNext(dish.id); },errmess => this.errMess = <any>errmess);
>>>>>>> parent of 213f8b9... Saving Changes to Server
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
=======
    const id = this.route.snapshot.params['id'];
    this.dishservice.getDish(id).subscribe(dish=>this.dish = dish);
>>>>>>> parent of 030993e... RxJS Part 2
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
      rating: 5,
      
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
