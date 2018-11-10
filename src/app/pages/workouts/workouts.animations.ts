import { trigger, state, style, animate, transition, query, animateChild } from '@angular/animations';

const buttonLeaveLength = '250ms';

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

export const fadeShrinkInOut = trigger('fadeShrinkInOut', [
    state('void', style({opacity: 0, height: '0px'})),
    transition('* <=> *', [
        animate(`${buttonLeaveLength} ease-in-out`)
    ])
]);

export const expand = trigger('expand', [
    state('true', style({height: '50%'})),
    state('false', style({height: '33%'})),
    transition('* <=> *', [
        animate(`${buttonLeaveLength} ease-in-out`)
    ])
]);
