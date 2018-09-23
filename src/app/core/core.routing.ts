import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LiftsComponent } from '../pages/lifts/components/lifts/lifts.component';
import { WorkoutsComponent } from '../pages/workouts/components/workouts/workouts.component';

const routes = [
    { path: '', component: WorkoutsComponent },
    { path: 'home', component: LiftsComponent },
    { path: 'dashboard', component: LiftsComponent },
    { path: 'lifts', component: LiftsComponent },
    { path: 'workouts', component: WorkoutsComponent },
    { path: 'goals', component: LiftsComponent },
    { path: '**', component: LiftsComponent }
]

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
