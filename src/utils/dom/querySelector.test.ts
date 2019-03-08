import { querySelector } from './querySelector';

describe('querySelector', () => {
  it('returns the correct element', () => {
    const parent = document.createElement('div');
    const child = document.createElement('a');

    parent.appendChild(child);

    const result = querySelector('a', parent);

    expect(result).toBe(child);
  });

  it('throws if the query fails', () => {
    expect(() => querySelector('#random')).toThrow();
  });
});
