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

    console.log(firstControl.value, secControl.value);
    return firstControl.value === secControl.value ? null : { missMatch: true };
  };
}

function validateAge(min: number, max: number): ValidatorFn {
  return (
    control: AbstractControl
  ): { [key: string]: boolean | number } | null => {
    return isNaN(control.value) || control.value < min || control.value > max
      ? { age: true, min, max }
      : null;
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
      age: [null, [Validators.required, validateAge(15, 90)]],
      emailGroup: this.formBuilder.group(
        {
          email: ["", [Validators.required, Validators.email]],
          confirmemail: ["", [Validators.required]],
        },
        { validators: controlsMatcher("email") }
      ),
      passwordGroup: this.formBuilder.group(
        {
          password: ["", [Validators.required, Validators.minLength(6)]],
          confirmpassword: ["", [Validators.required]],
        },
        { validators: controlsMatcher("password") }
      ),
    });

    this.infoForm.get("firstName").valueChanges.pipe(debounceTime(1000));
  }
}
