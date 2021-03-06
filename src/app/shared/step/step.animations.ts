import { trigger, state, style, animate, transition } from '@angular/animations';

export const slideLeftRight = trigger('slideLeftRight', [
    state('*', style({transform: 'translateX({{indexOffset}}%)'}), { params: { indexOffset: 0 }}),
    transition('* <=> *', [
        animate('300ms ease-in-out')
    ])
]);
