import { API_BASE_URL } from "./settings.js";

export class LogInManager
{
    
    async sendLogInData(loginData) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            console.log('Success:', data);
            return data;

        } catch (error) {
            console.error('Connection or Logic Error:', error.message);
        }
    }

}