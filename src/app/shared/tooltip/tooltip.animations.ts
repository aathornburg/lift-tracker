import { trigger, state, style, animate, transition } from '@angular/animations';

export const fadeSlideInOut = trigger('fadeSlideInOut', [
    state('open', style({opacity: 1})),
    state('closedFromUp', style({opacity: 0, transform: 'translate3d(-50%, 30%, 0)'})),
    state('closedFromRight', style({opacity: 0, transform: 'translate3d(-30%, 0, 0)'})),
    state('closedFromDown', style({opacity: 0, transform: 'translate3d(-50%, -30%, 0)'})),
    state('closedFromLeft', style({opacity: 0, transform: 'translate3d(30%, 0, 0)'})),
    transition('* => *', [
        animate(`200ms ease-in-out`)
    ])
]);
