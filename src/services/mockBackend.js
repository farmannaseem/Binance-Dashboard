class MockBackend {
  constructor() {
    // Initialize users array from localStorage
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  register(userData) {
    return new Promise((resolve, reject) => {
      try {
        // Check if user exists
        if (this.users.find(u => u.email === userData.email)) {
          throw new Error('User already exists');
        }

        // Create new user
        const user = {
          id: Date.now().toString(),
          email: userData.email,
          name: userData.name,
          password: userData.password,
          createdAt: new Date().toISOString()
        };

        this.users.push(user);
        this.saveUsers();

        const { password, ...userWithoutPassword } = user;
        const token = this.generateToken(user);

        resolve({
          data: {
            token,
            user: userWithoutPassword
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      try {
        // Debug logs
        console.log('Stored users:', this.users);
        console.log('Login attempt with:', credentials);

        const user = this.users.find(u => 
          u.email === credentials.email && 
          u.password === credentials.password
        );

        if (!user) {
          console.log('No matching user found');
          throw new Error('Invalid credentials');
        }

        console.log('Found user:', user);

        const { password, ...userWithoutPassword } = user;
        const token = this.generateToken(user);

        const response = {
          data: {
            token,
            user: userWithoutPassword
          }
        };

        console.log('Login response:', response);
        resolve(response);
      } catch (error) {
        console.error('Login error:', error);
        reject(error);
      }
    });
  }

  getUser(id) {
    return new Promise((resolve, reject) => {
      try {
        const user = this.users.find(u => u.id === id);
        if (!user) {
          throw new Error('User not found');
        }
        
        const { password, ...userWithoutPassword } = user;
        resolve({
          data: userWithoutPassword
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  generateToken(user) {
    return btoa(JSON.stringify({
      userId: user.id,
      email: user.email,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));
  }
}

export const mockBackend = new MockBackend(); 