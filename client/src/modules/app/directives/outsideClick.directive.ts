import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[outsideClick]'
})
export class OutsideClickDirective {
    @Output()
    outsideClick = new EventEmitter<void>();

    constructor(private readonly elementRef: ElementRef) {
    }

    @HostListener('document:click', ['$event.target'])
    onClick(targetElement) {
        this.checkOusideClick(targetElement);
    }

    @HostListener('document:touchstart', ['$event.target'])
    onTouch(targetElement) {
        this.checkOusideClick(targetElement);
    }

    private checkOusideClick(targetElement) {
        const clickedInside = this.elementRef.nativeElement.contains(targetElement);

        if (!clickedInside) {
            this.outsideClick.emit(null);
        }
    }
}
