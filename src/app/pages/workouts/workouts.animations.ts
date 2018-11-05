import { trigger, state, style, animate, transition, query, animateChild } from '@angular/animations';

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

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        style({opacity: 0}),
        animate('1500ms ease-in-out', style({opacity: 1}))
    ]),
    transition(':leave', [
        style({opacity: 1}),
        animate('1500ms ease-in-out', style({opacity: 0}))
    ])
    // state('true', style({'min-height': 'initial', height: '45px', overflow: 'hidden', padding: '0.25em'})),
    // state('false', style({height: '*'})),
    // transition('* <=> *', [
    //     animate('150ms ease-in-out')
    // ])
]);

export const heightTest = trigger('heightTest', [
    transition('* <=> *', [
        style({height: '*'}),
        animate('1500ms ease-in-out', style({height: '*'})),
        query('@fadeInOut', [
            animateChild()
        ])
    ])
]);
