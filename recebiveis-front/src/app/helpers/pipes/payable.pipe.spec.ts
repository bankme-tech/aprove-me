import { PayablePipe } from './payable.pipe';

describe('PayablePipe', () => {
  it('create an instance', () => {
    const pipe = new PayablePipe();
    expect(pipe).toBeTruthy();
  });
});
