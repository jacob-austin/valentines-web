import { Component, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationPlayer, AnimationBuilder } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Valentines';
  yesButtonSize: number = 100;
  noButtonSize: number = 50;
  yesFontSize: number = 14;
  translateY: number = 0;
  clickCount: number = 0;
  yesButtonClicked: boolean = false;
  player!: AnimationPlayer;
  gifPath: string = 'assets/valentines.gif';

  constructor(private renderer: Renderer2, private builder: AnimationBuilder) {}

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
