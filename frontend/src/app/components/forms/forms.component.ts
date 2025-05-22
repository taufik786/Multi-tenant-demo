import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
userForm!: FormGroup;
formFields: any[] = [];

constructor(private userServices:UserService){}

ngOnInit() {
  this.userServices.getForm(`${localStorage.getItem('org')}`).subscribe((formSchema:any) => {
    this.formFields = formSchema.fields;
    const formGroup:any = {};
    formSchema.fields.forEach((field:any) => {
      formGroup[field.name] = field.required
        ? new FormControl('', Validators.required)
        : new FormControl('');
    });
    this.userForm = new FormGroup(formGroup);
  });
}

submitForm() {
  console.log(this.userForm.value);
  // You can POST this data to another API to store user submissions
}

}
