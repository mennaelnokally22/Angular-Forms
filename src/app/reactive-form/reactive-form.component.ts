import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";

import { debounceTime } from "rxjs/operators";

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
