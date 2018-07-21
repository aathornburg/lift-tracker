import { OverlayModule } from './overlay.module';

describe('OverlayModule', () => {
  let overlayModule: OverlayModule;

  beforeEach(() => {
    overlayModule = new OverlayModule();
  });

  it('should create an instance', () => {
    expect(overlayModule).toBeTruthy();
  });
});
