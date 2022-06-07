import { encrypt, decrypt } from '@utils/encryption';

describe('encryption', () => {
  it('should encrypt and decrypt token correctly', () => {
    const sampleToken = 'sampleToken';
    expect(encrypt(sampleToken)).not.toEqual(sampleToken);
    expect(decrypt(encrypt(sampleToken))).toEqual(sampleToken);
  });
});
