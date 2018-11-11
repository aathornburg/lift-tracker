import { trigger, state, style, animate, transition, query, animateChild, group, keyframes } from '@angular/animations';

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

export const shrink = trigger('shrink', [
    state('true', style({height: '75px'})),
    state('false', style({height: '*'})),
    transition('* <=> *', [
        group([
            query('@*', [
                animateChild()
            ]),
            animate(`${buttonLeaveLength} ease-in-out`),
        ])
    ])
]);

export const positionCircle = trigger('positionCircle', [
    state('false', style({top: 'calc(100% - (100% / (3 * 2)))', bottom: 'calc(100% / (3 * 2))'})),
    state('true', style({top: 'calc(100% - (100% / (2 * 2)))', bottom: 'calc(100% / (2 * 2))'})),
    transition('* <=> *', [
        animate(`500ms ease-in-out`)
    ])
]);

export const circleExpand = trigger('circleExpand', [
    state('false', style({opacity: 0, padding: 0, background: '#33b7b7'})),
    state('true', style({opacity: 1, padding: '102%', background: 'white'})),
    transition('* <=> *', [
        animate(`500ms ease-in-out`)
    ])
]);
