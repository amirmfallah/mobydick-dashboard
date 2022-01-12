import {
  Directive,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[fileUpload]',
})
export class DragDropDirective {
  @Output() FileDropped = new EventEmitter<FileList>();
  @HostBinding('class.hovering') hovering: boolean;

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.hovering = true;
  }
  // Dragleave listener
  @HostListener('dragleave', ['$event']) onDragLeave(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.hovering = false;
  }
  // Drop listener
  @HostListener('drop', ['$event']) ondrop(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.FileDropped.emit(files);
    }
    this.hovering = false;
  }
}
