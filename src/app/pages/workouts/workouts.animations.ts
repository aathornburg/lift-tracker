import { trigger, state, style, animate, transition, query, animateChild, group } from '@angular/animations';

const buttonLeaveLength = '250ms';
const circleAnimateOutLength = '500ms';

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

export const fadeInOut = trigger('fadeInOut', [
    state('void', style({opacity: 0})),
    transition(':enter', [
        animate(`350ms 150ms ease-in-out`)
    ]),
    transition(':leave', [
        animate(`250ms ease-in-out`)
    ])
]);

export const expandButton = trigger('expandButton', [
    state('true', style({height: '50%'})),
    state('false', style({height: '33%'})),
    transition('* <=> *', [
        animate(`${buttonLeaveLength} ease-in-out`)
    ])
]);

export const expand = trigger('expand', [
    state('*', style({height: '*'})),
    state('void', style({height: '102px'})), // TODO:  Set this using a variable to be the current height of the workout day
    transition('* <=> *', [
        group([
            query('@*', [
                animateChild()
            ], { optional: true }),
            animate(`${buttonLeaveLength} ease-in-out`)
        ])
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
    // In these calculations, the value (100% / (x * 2)) appears often.  The "x" is the number of visible buttons on the left of the workout day.
    state('topOpen', style({top: 'calc(100% / (3 * 2))', bottom: 'calc(100% - (100% / (3 * 2)))'})),
    state('bottomOpen', style({top: 'calc(100% - (100% / (2 * 2)))', bottom: 'calc(100% / (2 * 2))'})),
    transition('bottomOpen => none', [
        animate(`${circleAnimateOutLength} ease-in-out`, style({top: 'calc(100% - (100% / (3 * 2)))', bottom: 'calc(100% / (3 * 2))'}))
    ]),
    transition('topOpen => none', [
        group([
            query('@*', [
                animateChild()
            ]),
            animate(`${circleAnimateOutLength} ease-in-out`, style({top: 'calc(100% / (3 * 2))', bottom: 'calc(100% - (100% / (3 * 2)))'}))
        ])
    ])
]);

export const circleExpand = trigger('circleExpand', [
    state('none',  style({opacity: 0, padding: 0, background: '#33b7b7'})), // The background is the $main-color scss variable value
    state('topOpen', style({opacity: 1, padding: '102%', background: 'white'})),
    state('bottomOpen', style({opacity: 1, padding: '102%', background: 'white'})),
    transition('* <=> *', [
        animate(`${circleAnimateOutLength} ease-in-out`)
    ])
]);
