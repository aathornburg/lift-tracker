import { trigger, state, style, animate, transition, query, animateChild } from '@angular/animations';

export const nestedAnimation = trigger('nestedAnimation', [
    transition('* => *', [
        query('@*', animateChild(), {optional: true})
    ])
]);

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        style({opacity: 0}),
        animate('150ms ease-in-out', style({opacity: 1}))
    ]),
    transition(':leave', [
        style({opacity: 1}),
        animate('150ms ease-in-out', style({opacity: 0}))
    ])
]);

export const scaleInOut = trigger('scaleInOut', [
    transition(':enter', [
        style({transform: 'scale(.8)'}),
        animate('150ms ease-in-out', style({transform: 'scale(1)'}))
    ]),
    transition(':leave', [
        style({transform: 'scale(1)'}),
        animate('150ms ease-in-out', style({transform: 'scale(.8)'}))
    ])
]);
