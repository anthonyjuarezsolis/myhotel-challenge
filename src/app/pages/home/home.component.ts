import { Component, OnInit } from "@angular/core";
import { formatDate } from "@angular/common";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FirebaseCrudService } from "src/app/services/firebase.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public registerData: Object = {};
  public form: FormGroup;
  public messageRequiredItem: string;

  constructor(
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar,
    public firebaseCrudService: FirebaseCrudService
  ) {
    this.form = this.createForm();
    this.messageRequiredItem = "Campo obligatorio";
  }

  ngOnInit() {
    let dateActually = formatDate(Date.now(), "m-d-yym, h:mm a", "en-US");
    this.registerData = {
      name: "hi",
      id: "0001",
      creationDate: dateActually,
      // status: [

      // ],
      status: "1",
      price: 100,
      description: "description",
      stock: 2,
    };

    console.log(dateActually);
  }

  createForm() {
    return this.fb.group({
      name: ["", Validators.required],
      flat: ["", Validators.required],
      description: [""],
      beds: ["", Validators.required],
      price: ["", Validators.required],
    });
  }

  get formError(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  sendForm() {
    console.log(this.form.value);

    if (this.form.valid) {
      this.firebaseCrudService.create(this.form.value).then(() => {
        this.openSnackBar();
        this.form.reset();
        this.form.clearValidators();
        this.form.markAsUntouched();
        this.form.markAsPristine();
      });
    }
  }

  openSnackBar() {
    this.snackBar.open("Registro exitoso!", "", {
      duration: 1200,
    });
  }
}
