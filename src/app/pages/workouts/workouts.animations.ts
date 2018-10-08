import { trigger, state, style, animate, transition } from '@angular/animations';

export const slideUpDown = trigger('slideUpDown', [
    transition(':enter', [
        style({opacity: 0, transform: 'translateY(100%)'}),
        animate('150ms ease-in-out', style({opacity: 1, transform: 'translateY(0)'}))
    ]),
    transition(':leave', [
        style({opacity: 1, transform: 'translateY(0)'}),
        animate('150ms ease-in-out', style({opacity: 0, transform: 'translateY(100%)'}))
    ])
]);