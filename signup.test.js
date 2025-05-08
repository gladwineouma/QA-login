// signup.test.js
import { validateEmail, signUp } from './signup';

describe('validateEmail', () => {
  it('should return true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('should return false for invalid email', () => {
    expect(validateEmail('test@example')).toBe(false);
  });
});

describe('signUp', () => {
  it('should successfully sign up user', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'User created' }),
      })
    );
    const response = await signUp('test@example.com', 'password');
    expect(response.message).toBe('User created');
  });

  it('should throw error for invalid email', async () => {
    await expect(signUp('test@example', 'password')).rejects.toThrow('Invalid email format');
  });

  it('should handle API error', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false }));
    await expect(signUp('test@example.com', 'password')).rejects.toThrow('Signup failed');
  });
});