import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AnimationPlayer, AnimationBuilder, animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('moveAnimation', [
      transition('* => *', [
        animate('0.5s ease-out', style({ transform: '{{transform}}' }))
      ])
    ])
  ]
})
export class AppComponent implements AfterViewInit{
  @HostListener('window:resize')
  onResize() {
    this.setInitialButtonPosition();
  }

  @ViewChild('noButton', { static: false }) noButton!: ElementRef;
  @ViewChild('buttonContainer', { static: false }) buttonContainer!: ElementRef;

  title = 'Valentines';
  yesButtonSize: number = 100;
  noButtonSize: number = 50;
  yesFontSize: number = 14;
  showNoButton: boolean = true;
  translateY: number = 0;
  clickCount: number = 0;
  yesButtonClicked: boolean = false;
  player!: AnimationPlayer;
  gifPath: string = 'assets/valentines.gif';
  position: {left: number, top: number} = { left: 100, top: 100 };

  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
    ) {}

  ngAfterViewInit() {
   this.setInitialButtonPosition();
  }

  setInitialButtonPosition() {
    if (this.noButton && this.buttonContainer) {
      const buttonRect = this.noButton.nativeElement.getBoundingClientRect();
      const containerRect = this.buttonContainer.nativeElement.getBoundingClientRect();
      this.position = {
        left: containerRect.left + buttonRect.width + 20,
        top: containerRect.top - 9
      };
      this.cdr.detectChanges();
    }
  }

  moveButton() {
    const buttonRect = this.noButton.nativeElement.getBoundingClientRect();

    const maxX = window.innerWidth - buttonRect.width;
    const maxY = window.innerHeight - buttonRect.height;

    this.position = {
      left: Math.floor(Math.random() * maxX),
      top: Math.floor(Math.random() * maxY)
    };
  }

  getTransform() {
    // TODO: Fix this to work with absolute element, this is a placeholder for now.
    return `translate(${0}px, ${0}px)`;
  }

  showYes() {
    this.clickCount++;
    if (this.clickCount >= 2) {
      this.renderer.addClass(document.body, 'scrolling-hearts');
      this.yesButtonClicked = true;
      this.showNoButton = false;
    } else {
      this.showNoButton ? this.setInitialButtonPosition() : this.toggleNoButton();
      this.gifPath = 'assets/marryMe.gif';
    }
  }

  toggleNoButton() {
    this.showNoButton = !this.showNoButton;
    if (this.showNoButton) this.setInitialButtonPosition();
  }
}
