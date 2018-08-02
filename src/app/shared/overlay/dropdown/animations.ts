import { trigger, state, style, animate, transition } from '@angular/animations';

export const FadeSlideInOut = trigger('fadeSlideInOut', [
    state('visible', style({opacity: 1, transform: 'translateY(0)'})),
    state('closing, closed', style({opacity: 0, transform: 'translateY(-30%)'})),
    transition('* <=> *', [
        animate('150ms ease-in-out')
    ])
]);
