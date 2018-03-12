require('angular');

/** Configuration */
import { configModule } from './configuration/config.module';

/** Services */
import { servicesModule } from './services/services.module';

/** Components */
import { navigationModule } from './components/navigation/navigation.module';
import { dashboardModule } from './components/dashboard/dashboard.module';
import { workoutsModule } from './components/workout-components/workouts/workouts.module';
import { liftsModule } from './components/lift-components/lifts/lifts.module';
import { goalsModule } from './components/goals/goals.module';
import { addLiftWeightModule } from './components/lift-components/add-lift-weight/addLiftWeight.module';
import { allLiftsModule } from './components/lift-components/all-lifts/allLifts.module';
import { createFirstWorkoutModule } from './components/workout-components/create-first-workout/createFirstWorkout.module';

export default angular
    .module('angularJSSandbox',
        ['configModule', 'servicesModule', 'navigationModule', 'dashboardModule', 'liftsModule', 'workoutsModule', 'goalsModule',
        'addLiftWeightModule', 'allLiftsModule', 'workoutsModule', 'createFirstWorkoutModule']
    );