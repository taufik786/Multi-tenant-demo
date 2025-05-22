import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

interface Subchild {
  child: string;
  subchildren: string[];
}

interface Route {
  parent: string;
  children: Subchild[];
}
@Component({
  selector: 'app-admin',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit, OnDestroy {
  routes: Route[] = [];
  newParent = '';
  newChild = '';
  newSubchild = '';

  selectedParent: string | null = null;
  selectedChild: string | null = null;

  fields: any[] = [];
  fieldForm!: FormGroup;
  featuresType = '';
  serviceForm: any = FormGroup;
  submited = false;
  number: any;
  @ViewChild('content') content: any;
  modalSubs!: Subscription;

  formSubmitted = false;
  constructor(
    private userServices: UserService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/
          ),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)]],
      address: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fieldForm = this.fb.group({
      label: ['', Validators.required],
      type: ['text', Validators.required],
      placeholder: [''],
      width: [12, [Validators.required, Validators.min(1), Validators.max(12)]],
      name: ['', Validators.required],
      value: [''],
      defaultValue: [''],
      requiredType: [''],
    });
  }

  open() {
    this.modalService.open(this.content).result.then(
      (result) => {},
      (reason) => {
        this.submited = false;
        this.serviceForm.reset();

      }
    );
  }

  addParent() {
    if (this.newParent.trim()) {
      this.routes.push({ parent: this.newParent.trim(), children: [] });
      this.selectedParent = this.newParent.trim();
      this.newParent = '';
    }
  }

  // Add child under selected parent
  addChild() {
    if (!this.selectedParent || !this.newChild.trim()) return;

    const parentObj = this.routes.find((r) => r.parent === this.selectedParent);
    if (parentObj) {
      parentObj.children.push({ child: this.newChild.trim(), subchildren: [] });
      this.selectedChild = this.newChild.trim();
      this.newChild = '';
    }
  }

  // Add subchild under selected child of selected parent
  addSubchild() {
    if (!this.selectedParent || !this.selectedChild || !this.newSubchild.trim())
      return;

    const parentObj = this.routes.find((r) => r.parent === this.selectedParent);
    const childObj = parentObj?.children.find(
      (c) => c.child === this.selectedChild
    );
    if (childObj) {
      childObj.subchildren.push(this.newSubchild.trim());
      this.newSubchild = '';
    }
  }
  submitRoute() {
    if (this.routes.length === 0) {
      console.error('No routes to submit');
      return;
    }
    this.routes.forEach((item: any) => {
      item.orgId = localStorage.getItem('org');
    }); // Add orgId to each route
    this.userServices.addRoutes(this.routes).subscribe(
      (response) => {
        console.log('Routes added successfully:', response);
      },
      (error) => {
        console.error('Error adding routes:', error);
      }
    );
  }

  onServieForm() {
    // this.submited = true;
    // if (this.serviceForm.invalid) {
    //   return;
    // }
    // this.formSubmitted = true;
    // this.serviceForm.value.featuresType = this.featuresType;
    // this.userFormService.ApplyService(this.serviceForm.value).subscribe(
    //   (res: any) => {
    //     this.serviceForm.reset();
    //     this.submited = false;
    //     this.alert = {
    //       popup: true,
    //       message: res.message,
    //       alertType: 'success',
    //     };
    //     setTimeout(() => {
    //       this.formSubmitted = false;
    //       this.modalService.dismissAll('Save click');
    //     }, 3000);
    //   },
    //   (err) => {
    //     this.alert = {
    //       popup: true,
    //       message: err.error.message,
    //       alertType: 'danger',
    //     };
    //     this.formSubmitted = false;
    //   }
    // );
  }
  ngOnDestroy(): void {
    this.modalSubs.unsubscribe();
  }
}
