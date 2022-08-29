import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { I_IconMode, I_IconType } from "./icon.interface";

@Component({
  selector: "myhotel-icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.scss"],
})
export class IconComponent implements OnInit, OnChanges {
  @Input() name: string = "face";
  @Input() size: string = "24";
  @Input() color: string = "dark";
  @Input() type: I_IconType = "outlined";
  @Input() mode: I_IconMode = "default";

  public classes!: Array<string>;

  ngOnInit() {
    this.classes = [
      "myhotel-icon-material",
      "myhotel-icon-material--" + this.type,
      "myhotel-icon-material__mode-" + this.mode,
    ];
  }

  ngOnChanges() {
    this.classes = [
      "myhotel-icon-material",
      "myhotel-icon-material--" + this.type,
      "myhotel-icon-material__mode-" + this.mode,
    ];
  }
}
