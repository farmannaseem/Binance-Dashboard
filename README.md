# Binance Investment Dashboard

A full-stack web application for managing and tracking investments on the Binance Smart Chain. The platform features an innovative package investment system with automatic merging and earnings distribution.

## 🚀 Features

## Live Link 
https://farmannaseem.github.io/Bianance-Dashboard/

### Investment System
- Package investments from $10 to $1280
- Automatic package matching and merging
- Smart earnings distribution at $80 threshold
- 10% withdrawal fee on earnings

### Blockchain Integration
- Real-time BNB balance tracking
- BSCScan transaction history
- Gas fee monitoring
- BEP-20 token tracking

### User Features
- Secure authentication system
- Real-time portfolio tracking
- Transaction history
- Automated earnings distribution

## 🛠 Tech Stack

### Frontend
- React.js with Vite
- Bootstrap for styling
- Ethers.js for blockchain interaction
- React Router for navigation
- Axios for API requests

### Backend
- Node.js & Express.js
- MongoDB for database
- JWT for authentication
- BSCScan API integration

### Blockchain
- Binance Smart Chain
- Web3 integration
- Smart contract interaction

## 📦 Package System

Investment packages are available in the following denominations:
- $10
- $20
- $40
- $80 (No withdrawal)
- $160
- $320
- $640
- $1280

### How It Works
1. User selects a package amount
2. System looks for matching package
3. When matched, packages merge and double
4. At $80, amount is added to earnings
5. Earnings can be withdrawn with 10% fee

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- MetaMask wallet
- BSCScan API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/farmannaseem/Bianance-Dashboard.git
cd Bianance-Dashboard
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

4. Configure Environment Variables

Backend (.env):
```env
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri
PORT=5000
```

Frontend (.env):
```env
VITE_BSCSCAN_API_KEY=your_bscscan_api_key
```

5. Start the Application

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm run dev
```

## 📱 Usage

1. Register/Login to your account
2. Connect your MetaMask wallet
3. Choose an investment package
4. Monitor your investments
5. Track merged packages
6. Withdraw earnings (10% fee applies)

## 🔒 Security Features

- JWT authentication
- Encrypted passwords
- Protected API endpoints
- Secure wallet connections
- Transaction verification

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes
```bash
git commit -m 'Add some AmazingFeature'
```
4. Push to the branch
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Farman Naseem**
- Email: farmannaseem789@gmail.com
- GitHub: [@farmannaseem](https://github.com/farmannaseem)

## 🙏 Acknowledgments

- BSCScan API for blockchain data
- Binance Smart Chain for network infrastructure
- MetaMask for wallet integration
- MongoDB for database solutions

## 📞 Support

For support, email farmannaseem789@gmail.com or open an issue in the repository.

---
Made with ❤️ by Farman Naseem
