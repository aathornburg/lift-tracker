import { LiftsModule } from './lifts.module';

describe('LiftsModule', () => {
  let liftsModule: LiftsModule;

  beforeEach(() => {
    liftsModule = new LiftsModule();
  });

  it('should create an instance', () => {
    expect(liftsModule).toBeTruthy();
  });
});
