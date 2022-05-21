import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.scss'],
})
export class InformationDialogComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() content: string;
  @Input() confirmButton: string;
  @Input() cancelButton: string;

  constructor(private popoverController: PopoverController) {}

  ngOnInit(): void {}

  public buttonClick(data: string): void {
    this.popoverController.dismiss(data);
  }
}
