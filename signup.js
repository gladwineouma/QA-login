// signup.js
export function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
  export async function signUp(email, password) {
    if (!validateEmail(email)) {
      throw new Error("Invalid email format");
    }
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Signup failed');
    }
    return response.json();
  }