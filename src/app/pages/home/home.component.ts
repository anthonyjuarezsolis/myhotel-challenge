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
import { map } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { ModalEditComponent } from "src/app/commons/modals/modal-edit/modal-edit.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public registerData: Object = {};
  public form: FormGroup;
  public messageRequiredItem: string;
  public link: string;
  public firebaseListInfo: Array<any>;
  public disableButton: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public firebaseCrudService: FirebaseCrudService
  ) {
    this.form = this.createForm();
    this.firebaseListInfo = [];

    this.messageRequiredItem = "Campo obligatorio";
    this.link = "registro";
    this.disableButton = false;
  }

  public ngOnInit() {
    this.retrieveList();
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

  public sendForm() {
    if (this.form.valid) {
      this.disableButton = true;
      let dateActually = formatDate(Date.now(), "M-d-yy, h:mm a", "en-US");
      let optionsPrice = [
        {
          id: "green",
          value: "< $300",
        },
        {
          id: "yellow",
          value: "$301 - $999",
        },
        {
          id: "red",
          value: "> $1000",
        },
      ];
      this.registerData = {
        name: this.form.value?.name,
        creationDate: dateActually,
        flat: this.form.value?.flat,
        description: this.form.value?.description,
        beds: this.form.value?.beds,
        price: this.form.value?.price,
        optionsPrice,
      };

      this.firebaseCrudService.create(this.registerData).then(() => {
        this.openSnackBar();
        this.resetAndCleanForm();
        this.disableButton = false;
      });
    }
  }

  public openSnackBar() {
    this.snackBar.open("Registro exitoso!", "", {
      duration: 1200,
    });
  }

  public resetAndCleanForm() {
    this.form.reset();
    this.form.controls["name"].setErrors(null);
    this.form.controls["flat"].setErrors(null);
    this.form.controls["beds"].setErrors(null);
    this.form.controls["price"].setErrors(null);
  }

  public changeView(link: string) {
    this.link = link;
  }

  public retrieveList(): void {
    this.firebaseCrudService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.firebaseListInfo = data;
      });
  }

  public onModalEdit(dataEdit: any) {
    this.dialog.open(ModalEditComponent, {
      width: "489px",
      panelClass: "custom-container-no-padding",
      data: {
        title: "Editar habitación seleccionada",
        dataEdit,
      },
    });
  }

  public onDelete(id: string) {
    this.firebaseCrudService.delete(id);
  }
}
