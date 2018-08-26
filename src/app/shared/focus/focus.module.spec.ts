import { FocusModule } from './focus.module';

describe('TrapTabModule', () => {
  let focusModule: FocusModule;

  beforeEach(() => {
    focusModule = new FocusModule();
  });

  it('should create an instance', () => {
    expect(focusModule).toBeTruthy();
  });
});
