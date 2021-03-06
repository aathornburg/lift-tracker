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
    state('false', style({opacity: 0})),
    state('true', style({opacity: 1})),
    transition('false => true', [
        animate(`350ms 150ms ease-in-out`)
    ]),
    transition('true => false', [
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

export const smoothHeight = trigger('smoothHeight', [
    transition('* <=> *', [
        group([
            query('@*', [
                animateChild()
            ]),
            style({height: '{{oldHeight}}px'}),
            animate(`${buttonLeaveLength} ease-in-out`, style({height: '{{newHeight}}px'}))
        ])
    ], { params: { newHeight: 0, oldHeight: 0 }})
]);

export const positionCircle = trigger('positionCircle', [
    // In these calculations, the value (100% / (x * 2)) appears often.  The "x" is the number of visible buttons on the left of the workout day.
    state('topOpen', style({top: 'calc(100% / (3 * 2))', bottom: 'calc(100% - (100% / (3 * 2)))'})),
    state('bottomOpen', style({top: 'calc(100% - (100% / (2 * 2)))', bottom: 'calc(100% / (2 * 2))'})),
    transition('none => bottomOpen', [
        style({top: 'calc(100% - (100% / (3 * 2)))', bottom: 'calc(100% / (3 * 2))'}),
        group([
            query('@*', [
                animateChild()
            ]),
            animate(`${circleAnimateOutLength} ease-in-out`)
        ])
    ]),
    transition('bottomOpen => none', [
        group([
            query('@*', [
                animateChild()
            ]),
            animate(`${circleAnimateOutLength} ease-in-out`, style({top: 'calc(100% - (100% / (3 * 2)))', bottom: 'calc(100% / (3 * 2))'}))
        ])
    ]),
    transition('topOpen => none', [
        group([
            query('@*', [
                animateChild()
            ]),
            animate(`${circleAnimateOutLength} ease-in-out`, style({top: 'calc(100% / (3 * 2))', bottom: 'calc(100% - (100% / (3 * 2)))'}))
        ])
    ]),
    transition('topOpen => bottomOpen', [
        group([
            query('@*', [
                animateChild()
            ]),
            style({top: 'calc(100% - (100% / (3 * 2)))', bottom: 'calc(100% / (3 * 2))'}),
            animate(`${circleAnimateOutLength} ease-in-out`)
        ])
    ])
]);

export const circleExpand = trigger('circleExpand', [
    state('none',  style({opacity: 0, padding: 0, background: '#33b7b7'})), // The background is the $main-color scss variable value
    transition('none => *', [
        animate(`${circleAnimateOutLength} ease-in-out`, style({opacity: 1, padding: '102%', background: 'white'}))
    ]),
    transition('* => none', [
        style({opacity: 1, padding: '102%', background: 'white'}),
        animate(`${circleAnimateOutLength} ease-in-out`)
    ]),
    transition('topOpen => bottomOpen', [
        style({opacity: 0, padding: 0, background: '#33b7b7'}),
        animate(`${circleAnimateOutLength} ease-in-out`, style({opacity: 1, padding: '102%', background: 'white'}))
    ]),
]);

export const moveDownShrink = trigger('moveDownShrink', [
    state('true', style({bottom: '3px', 'padding': '0', 'font-size': '14px', height: '17px'})),
    transition('false => true', [
        animate(`150ms ease-in-out`)
    ]),
    transition('true => false', [
        animate(`150ms ease-in-out`)
    ])
]);
