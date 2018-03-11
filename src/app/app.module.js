require('angular');

/** Configuration */
import { configModule } from './configuration/config.module';

/** Services */
import { servicesModule } from './services/services.module';

/** Components */
import { navigationModule } from './components/navigation/navigation.module';
import { dashboardModule } from './components/dashboard/dashboard.module';
import { workoutsModule } from './components/workouts/workouts.module';
import { liftsModule } from './components/lifts/lifts.module';
import { goalsModule } from './components/goals/goals.module';
import { addLiftWeightModule } from './components/add-lift-weight/addLiftWeight.module';
import { quickLiftsModule } from './components/quick-lifts/quickLifts.module';
import { createFirstWorkoutModule } from './components/create-first-workout/createFirstWorkout.module';

export default angular
    .module('angularJSSandbox',
        ['configModule', 'servicesModule', 'navigationModule', 'dashboardModule', 'liftsModule', 'workoutsModule', 'goalsModule',
        'addLiftWeightModule', 'quickLiftsModule', 'workoutsModule', 'createFirstWorkoutModule']
    );