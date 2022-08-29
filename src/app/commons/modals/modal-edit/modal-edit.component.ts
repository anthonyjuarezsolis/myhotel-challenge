import { Component, OnInit, Inject } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

import { FirebaseCrudService } from "src/app/services/firebase.service";

@Component({
  selector: "app-modal-edit",
  templateUrl: "./modal-edit.component.html",
  styleUrls: ["./modal-edit.component.scss"],
})
export class ModalEditComponent implements OnInit {
  public form: FormGroup;
  public messageRequiredItem: string;
  public registerData: Object = {};

  constructor(
    private readonly fb: FormBuilder,
    public firebaseCrudService: FirebaseCrudService,
    public dialogRef: MatDialogRef<ModalEditComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.createForm();
    this.messageRequiredItem = "Campo obligatorio";
  }

  public ngOnInit(): void {
    this.onFormSetValue();
  }

  public onFormSetValue() {
    this.form.controls["name"].setValue(this.data?.dataEdit?.name);
    this.form.controls["flat"].setValue(this.data?.dataEdit?.flat);
    this.form.controls["description"].setValue(
      this.data?.dataEdit?.description
    );
    this.form.controls["beds"].setValue(this.data?.dataEdit?.beds);
    this.form.controls["price"].setValue(this.data?.dataEdit?.price);
  }

  public createForm() {
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

  public updateElement(): void {
    this.registerData = {
      name: this.form.value?.name,
      flat: this.form.value?.flat,
      description: this.form.value?.description,
      beds: this.form.value?.beds,
      price: this.form.value?.price,
    };
    this.firebaseCrudService
      .update(this.data?.dataEdit?.id, this.registerData)
      .then(() => {
        this.onCloseModal();
      })
      .catch((err) => console.log(err));
  }

  public onCloseModal(): void {
    this.dialogRef.close();
  }
}
