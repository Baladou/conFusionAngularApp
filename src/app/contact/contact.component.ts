import { Component, OnInit, ViewChild ,Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';


import { flyInOut,expand } from '../animations/app.animation';

import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
   // tslint:disable-next-line:use-host-property-decorator
   host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),expand(),
  ]
})
export class ContactComponent implements OnInit {
  
  @ViewChild('fform') feedbackFormDirective;
  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackResult: Feedback
  errMsg: string;
  isLoading = false;
  FormShow = !this.isLoading;
  
  
  contactType = ContactType;

  constructor(private fb: FormBuilder, 
    @Inject('BaseURL') private BaseURL,
    private feedbackService: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
    this.FormShow=true;
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      telnum: ['', Validators.required ],
      email: ['', Validators.required ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.isLoading=true;
   
    this.FormShow=false;
    
    this.feedbackService.PostFeedback(this.feedback)
    
    .subscribe(feedback =>{
      
      this.feedback= feedback;
      this.isLoading=false;
    },
    errmsg => {this.feedback= null;this.errMsg = <any>errmsg;}

    )
    
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
   
    //reset the whole form to not have errors after resiting the form
    this.feedbackFormDirective.resetForm();
  }


}
