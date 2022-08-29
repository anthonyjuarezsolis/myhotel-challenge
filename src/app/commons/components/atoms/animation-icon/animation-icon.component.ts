import { Component, Input, OnInit } from "@angular/core";
import { I_AnimationIconTrigger } from "./animation-icon.interface";

@Component({
  selector: "myhotel-animation-icon",
  templateUrl: "./animation-icon.component.html",
  styleUrls: ["./animation-icon.component.scss"],
})
export class AnimationIconComponent implements OnInit {
  @Input() name: string = "dxaimgmp";
  @Input() size: string = "120";
  @Input() trigger: I_AnimationIconTrigger = "loop";
  @Input() colors: string = "primary:#6B6B6B,secondary:#ff5a70";
  @Input() colorPrimary: string = "#6B6B6B";
  @Input() colorSecondary: string = "#ff5a70";

  public classes!: Array<string>;

  ngOnInit() {
    this.classes = ["myhotel-animation-icon"];
    if (this.colorPrimary && this.colorSecondary) {
      this.colors = `primary:${this.colorPrimary},secondary:${this.colorSecondary}`;
    }
  }
}
