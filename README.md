# Wiremit - Money Transfer Application

A modern web application for Zimbabwean parents to send money to their children studying abroad in the UK or South Africa.

## Features

### Authentication
- **User Registration**: Secure account creation with name, email, and password
- **Login System**: Credential-based authentication with session management
- **Password Security**: Client-side validation with minimum requirements

### Dashboard
- **Send Money Interface**: 
  - USD amount input with min ($50) and max ($5000) limits
  - Currency selection (GBP for UK, ZAR for South Africa)
  - Real-time fee calculation (10% for GBP, 20% for ZAR)
  - Live exchange rate conversion with accurate rounding
  - Recipient information capture

- **Advertisement Carousel**: 
  - Auto-playing carousel with 3+ promotional ads
  - Manual navigation with previous/next controls
  - Responsive image handling with overlay content

- **Transaction History**: 
  - Paginated list of 15+ mock transactions
  - Status indicators (completed, pending, failed)
  - Detailed transaction information
  - Responsive table design

### Technical Features
- **Real FX Rates Integration**: Live exchange rates from provided API endpoint
- **Data Persistence**: localStorage for user accounts and transactions
- **Mobile Responsive**: Optimized for all device sizes
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Security Measures**: XSS prevention, input validation, secure credential storage

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **API Integration**: Fetch API with error handling
- **Storage**: Browser localStorage

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Hello007-wq/wiremit-app.git
cd wiremit-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## Design Decisions & Architecture

### Authentication Strategy
- **Storage Method**: localStorage for demo purposes
- **Security**: Passwords stored in plain text (demo only - would use bcrypt in production)
- **Session Management**: Simple token-based approach with user object storage
- **Multi-User Support**: Full support for multiple user accounts

### Component Architecture
```
src/
├── components/           # Reusable UI components
│   ├── Input.tsx        # Form input with validation
│   ├── Button.tsx       # Styled button component
│   ├── LoadingSpinner.tsx
│   ├── AuthLayout.tsx   # Authentication page layout
│   ├── Login.tsx        # Login form
│   ├── Register.tsx     # Registration form
│   ├── Dashboard.tsx    # Main dashboard container
│   ├── DashboardHeader.tsx
│   ├── SendMoney.tsx    # Money transfer interface
│   ├── AdvertisementCarousel.tsx
│   └── TransactionHistory.tsx
├── utils/               # Business logic
│   ├── auth.ts         # Authentication service
│   ├── fxRates.ts      # Exchange rates API integration
│   └── transactions.ts  # Transaction management
├── types/              # TypeScript interfaces
└── data/               # Static data (advertisements)
```

### Exchange Rate Handling
- **API Integration**: Real-time rates from provided endpoint
- **Caching Strategy**: 5-minute cache to reduce API calls
- **Error Handling**: Fallback rates when API is unavailable
- **Rate Structure**: Handles array-based API response format

### Transaction Fee Logic
- **GBP Transfers**: 10% fee on original USD amount
- **ZAR Transfers**: 20% fee on original USD amount
- **Calculation Order**: 
  1. Calculate fee in USD
  2. Subtract fee from original amount
  3. Convert remainder to target currency
  4. Round UP all monetary calculations for accuracy

### Data Flow
1. **User Authentication**: Login → Store user session → Redirect to dashboard
2. **FX Rates**: Fetch on dashboard load → Cache → Auto-refresh every 5 minutes
3. **Send Money**: Validate input → Calculate fees → Show preview → Submit transaction
4. **Transaction History**: Load user transactions → Paginate → Display with status

## Scalability Considerations

### Adding New Countries/Currencies
1. **FX Rates Service**: Already supports additional currencies from API
2. **Fee Structure**: Configurable fee rates per currency/country
3. **UI Components**: Currency selector easily extensible
4. **Validation**: Country-specific validation rules can be added

### Production Enhancements
- **Database Integration**: Replace localStorage with proper database
- **Authentication**: Implement JWT tokens with refresh mechanism
- **API Layer**: Add proper backend with rate limiting
- **Security**: HTTPS, CSRF protection, input sanitization
- **Monitoring**: Error tracking, analytics, performance monitoring

## Security Features

### Current Implementation
- **Input Validation**: Client-side validation for all forms
- **XSS Prevention**: Proper HTML escaping, no innerHTML usage
- **Data Sanitization**: Input trimming and type validation
- **Session Management**: Secure user session handling

### Production Recommendations
- **Password Hashing**: bcrypt or Argon2 for password security
- **HTTPS Enforcement**: SSL/TLS for all communications
- **CSRF Protection**: Anti-CSRF tokens for state-changing operations
- **Rate Limiting**: API request throttling
- **Content Security Policy**: Browser-level XSS protection

## API Integration

### FX Rates Endpoint
- **URL**: `https://68976304250b078c2041c7fc.mockapi.io/api/wiremit/InterviewAPIS`
- **Format**: Array of currency objects
- **Caching**: 5-minute local cache
- **Error Handling**: Graceful fallback to cached/default rates

## Testing Strategy

### Manual Testing Checklist
- [ ] User registration with validation
- [ ] Login with correct/incorrect credentials
- [ ] Send money form validation
- [ ] Transaction fee calculations
- [ ] Exchange rate updates
- [ ] Transaction history pagination
- [ ] Advertisement carousel functionality
- [ ] Mobile responsiveness
- [ ] Accessibility with keyboard navigation

### Automated Testing (Future)
- Unit tests for utility functions
- Component testing with React Testing Library
- E2E tests with Cypress
- API integration tests

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Optimizations
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: WebP format with fallbacks
- **Caching**: localStorage for user data and exchange rates
- **Debounced Inputs**: Reduced API calls during typing
- **Efficient Renders**: React.memo and useCallback where appropriate

## Accessibility Features
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Screen reader support for interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliant color ratios
- **Focus Management**: Visible focus indicators
- **Error Announcements**: Screen reader compatible error messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
