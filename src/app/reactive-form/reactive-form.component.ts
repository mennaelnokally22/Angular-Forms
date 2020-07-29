import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from "@angular/forms";

import { debounceTime } from "rxjs/operators";

function controlsMatcher(controlGroupName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const firstControl = control.get(controlGroupName);
    const secControl = control.get(`confirm${controlGroupName}`);

    return firstControl.value === secControl.value ? null : { missMatch: true };
  };
}

@Component({
  selector: "app-reactive-form",
  templateUrl: "./reactive-form.component.html",
  styleUrls: ["./reactive-form.component.css"],
})
export class ReactiveFormComponent implements OnInit {
  infoForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      emailGroup: this.formBuilder.group({
        email: ["", [Validators.required, Validators.email]],
        confirmEmail: ["", [Validators.required]],
      }),
    });

    this.infoForm.get("firstName").valueChanges.pipe(debounceTime(1000));
  }
}
