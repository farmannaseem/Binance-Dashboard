class PackageService {
  constructor() {
    this.packages = JSON.parse(localStorage.getItem('packages') || '[]');
  }

  savePackages() {
    localStorage.setItem('packages', JSON.stringify(this.packages));
  }

  async createPackage(amount) {
    return new Promise((resolve, reject) => {
      try {
        console.log('Creating package with amount:', amount);
        
        // Validate amount
        if (!amount || amount <= 0) {
          throw new Error('Invalid package amount');
        }

        // Check if user has enough balance (mock check)
        if (amount > 10000) { // Mock balance limit
          throw new Error('Insufficient balance');
        }

        const newPackage = {
          id: Date.now().toString(),
          amount: amount,
          status: 'active',
          createdAt: new Date().toISOString(),
          earnings: 0,
          lastUpdate: new Date().toISOString()
        };

        this.packages.push(newPackage);
        this.savePackages();

        console.log('Package created successfully:', newPackage);
        resolve(newPackage);
      } catch (error) {
        console.error('Error creating package:', error);
        reject(error);
      }
    });
  }

  async getPackages() {
    // Calculate current earnings before returning packages
    const currentTime = Date.now();
    this.packages = this.packages.map(pkg => {
      if (pkg.status === 'active') {
        const timePassed = currentTime - new Date(pkg.lastUpdate).getTime();
        const daysPassed = timePassed / (1000 * 60 * 60 * 24);
        pkg.earnings += (pkg.amount * 0.01) * daysPassed;
        pkg.lastUpdate = new Date().toISOString();
      }
      return pkg;
    });
    this.savePackages();
    return this.packages;
  }

  async getEarnings() {
    const earnings = this.packages.reduce((total, pkg) => {
      if (pkg.status === 'active') {
        // Calculate earnings based on time passed
        const timePassed = Date.now() - new Date(pkg.lastUpdate).getTime();
        const daysPassed = timePassed / (1000 * 60 * 60 * 24);
        const newEarnings = (pkg.amount * 0.01) * daysPassed; // 1% per day
        return total + newEarnings;
      }
      return total;
    }, 0);

    // Update packages with new earnings
    this.packages = this.packages.map(pkg => {
      if (pkg.status === 'active') {
        const timePassed = Date.now() - new Date(pkg.lastUpdate).getTime();
        const daysPassed = timePassed / (1000 * 60 * 60 * 24);
        pkg.earnings += (pkg.amount * 0.01) * daysPassed;
        pkg.lastUpdate = new Date().toISOString();
      }
      return pkg;
    });

    this.savePackages();
    return earnings;
  }

  async withdraw(amount) {
    return new Promise((resolve, reject) => {
      try {
        const totalEarnings = this.packages.reduce((total, pkg) => total + pkg.earnings, 0);
        if (amount > totalEarnings) {
          throw new Error('Insufficient earnings');
        }

        // Apply 10% withdrawal fee
        const fee = amount * 0.1;
        const netAmount = amount - fee;

        // Reset earnings after withdrawal
        this.packages = this.packages.map(pkg => ({
          ...pkg,
          earnings: 0,
          lastUpdate: new Date().toISOString()
        }));

        this.savePackages();
        resolve({ amount: netAmount, fee });
      } catch (error) {
        reject(error);
      }
    });
  }

  async deletePackage(packageId) {
    return new Promise((resolve, reject) => {
      try {
        // Find package index
        const packageIndex = this.packages.findIndex(pkg => pkg.id === packageId);
        
        if (packageIndex === -1) {
          throw new Error('Package not found');
        }

        // Remove package
        this.packages.splice(packageIndex, 1);
        this.savePackages();

        resolve({ success: true });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const packageService = new PackageService(); 