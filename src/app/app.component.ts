import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AnimationPlayer, AnimationBuilder, animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('moveAnimation', [
      transition('* => *', [
        animate('0.5s ease-out', style({ transform: 'translate(0, 0)' }))
      ])
    ])
  ]
})
export class AppComponent implements AfterViewInit{
  @ViewChild('noButton', { static: true }) noButton!: ElementRef;
  @ViewChild('container', { static: true }) container!: ElementRef;
  title = 'Valentines';
  yesButtonSize: number = 100;
  noButtonSize: number = 50;
  yesFontSize: number = 14;
  translateY: number = 0;
  clickCount: number = 0;
  yesButtonClicked: boolean = false;
  player!: AnimationPlayer;
  gifPath: string = 'assets/valentines.gif';
  position: {left: number, top: number} = { left: 100, top: 100 };

  constructor(private renderer: Renderer2, private builder: AnimationBuilder) {}

  ngAfterViewInit() {
    const buttonRect = this.noButton.nativeElement.getBoundingClientRect();
    const containerRect = this.container.nativeElement.getBoundingClientRect();
    this.position = {
      left: buttonRect.left - containerRect.left,
      top: buttonRect.top - containerRect.top
    };
  }

  moveButton() {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 50;
    this.position = {
      left: Math.floor(Math.random() * maxX),
      top: Math.floor(Math.random() * maxY)
    };
  }

  showYes() {
    this.renderer.addClass(document.body, 'scrolling-hearts');
    this.yesButtonClicked = true;
  }

  showNo() {
    this.yesButtonSize += 10;
    this.yesFontSize += 2;

    const yesButton = document.querySelector('.yes-button') as HTMLElement;
    yesButton.style.width = `${this.yesButtonSize}px`;
    yesButton.style.height = `${this.yesButtonSize}px`;
    yesButton.style.fontSize = `${this.yesFontSize}px`;
    
    this.clickCount++;
    this.translateY += 50;

    const noButton = document.querySelector('.no-button') as HTMLElement;
    noButton.style.transition = 'transform 0.3s';
    noButton.style.height = `${this.noButtonSize}px`;
    noButton.style.width = `${this.noButtonSize}px`;
    noButton.style.transform = `translateY(${this.translateY}px)`;
  }
}
