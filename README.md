# Shared Solar - Premium VNM/GNM Lead Generation Platform

A production-ready React + Vite frontend for a shared solar energy company helping customers adopt Virtual Net Metering (VNM) and Group Net Metering (GNM).

## 🚀 Features

### Core Features
- **Interactive Savings Calculator** - Real-time savings projections with charts
- **Eligibility Checker** - Guided wizard to determine VNM/GNM suitability
- **State Explorer** - Detailed information on regulations and subsidies by state
- **Case Studies** - Real-world success stories with financial breakdowns
- **Comparison Tool** - VNM vs GNM detailed comparison
- **Lead Capture Forms** - Optimized for conversion
- **FAQ System** - Categorized, searchable questions and answers

### Technical
- Built with **React 18** + **Vite** for blazing fast builds
- **Framer Motion** for smooth, premium animations
- **Recharts** for data visualization
- **Tailwind CSS** for responsive, modern styling
- **Lucide Icons** for beautiful, consistent iconography
- Mobile-first responsive design
- WCAG accessibility compliance
- SEO-optimized structure

## 📁 Project Structure

```
vnm-gnm-solar/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Sticky navigation with mega menu
│   │   ├── Footer.jsx              # Footer with links and contact
│   │   ├── Cards.jsx               # Reusable card components
│   │   ├── AnimatedCounter.jsx     # Number animation on scroll
│   │   └── SavingsCalculatorWidget.jsx  # Mini calculator for homepage
│   ├── pages/
│   │   ├── Home.jsx                # Landing page with hero + 7 sections
│   │   ├── VirtualNetMetering.jsx  # VNM education page
│   │   ├── GroupNetMetering.jsx    # GNM education page
│   │   ├── Calculator.jsx          # Full savings calculator with charts
│   │   ├── Eligibility.jsx         # Eligibility wizard
│   │   ├── Comparison.jsx          # VNM vs GNM comparison
│   │   ├── StateEligibility.jsx    # State-by-state details
│   │   ├── CaseStudies.jsx         # Success stories showcase
│   │   ├── FAQ.jsx                 # Categorized FAQ
│   │   └── Contact.jsx             # Lead capture form
│   ├── data/
│   │   ├── states.js               # State regulations & data
│   │   ├── caseStudies.js          # Success story data
│   │   └── faqs.js                 # FAQ content
│   ├── utils/
│   │   └── calculator.js           # Savings calculation engine
│   ├── App.jsx                     # Main app with routing
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles + Tailwind
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind theme
├── postcss.config.js               # PostCSS config
└── package.json                    # Dependencies
```

## 🎨 Design System

### Colors
- **Primary Green**: #16a34a - Primary actions, highlights
- **Slate**: Neutral grays for text and backgrounds
- **White**: Clean, premium aesthetic

### Typography
- **Headers**: Bold, sans-serif (Inter)
- **Body**: Regular weight, readable line-height
- **Small Text**: Slate-600 for secondary info

### Components
- **Card Premium**: Elevated shadow, border-slate-200
- **Buttons**: Primary (green), Secondary (slate), Outline (green border)
- **Badges**: Primary-100 background with primary-700 text

## 📊 Key Pages & Conversion Flow

### Home Page (Conversion Hub)
1. **Hero Section** - Problem statement + CTA
2. **How It Works** - VNM/GNM explained in 3 cards
3. **Savings Calculator Widget** - Embedded calculator preview
4. **Benefits** - 6-card grid of key benefits
5. **State Availability** - 5-state interactive map
6. **Case Studies** - 3 featured success stories
7. **Stats** - Animated counters showing impact
8. **FAQ Preview** - Top 3 questions
9. **Final CTA** - Dual button (Calculate + Consult)

### Calculator Page (Conversion Optimizer)
- Multi-parameter form (state, consumer type, bill, consumption, capacity)
- Real-time calculation updates
- Animated counter displays
- 3 chart visualizations:
  - 25-Year savings projection (Area chart)
  - Monthly variation (Bar chart)
  - Detailed breakdown table
- Pre-subsidy system cost included
- Recommended model suggestion
- Bottom CTA to booking

### Eligibility Page (Lead Qualifier)
- 4-question guided wizard
- Real-time eligibility determination
- VNM/GNM colored result cards
- Personalized next steps
- CTA to consultation

### State Details Page (Info Hub)
- Interactive state cards
- Detailed state parameters
- Subsidy information
- Processing timelines
- Eligibility criteria by type

## 🔧 Setup & Installation

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Navigate to project
cd vnm-gnm-solar

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will start at `http://localhost:5173`

## 💡 Customization

### Update Company Info
Edit `/src/components/Footer.jsx` and `/src/components/Navbar.jsx`:
- Company name
- Contact emails/phone
- Social media links

### Update States Data
Edit `/src/data/states.js`:
- Add/remove states
- Update tariffs, subsidies, regulations
- Modify eligibility criteria

### Update Case Studies
Edit `/src/data/caseStudies.js`:
- Add your real projects
- Update financial data
- Modify testimonials

### Update FAQs
Edit `/src/data/faqs.js`:
- Add/edit questions
- Update answers
- Add new categories

### Modify Calculations
Edit `/src/utils/calculator.js`:
- Adjust system cost assumptions
- Update tariff calculations
- Modify degradation rates

## 📈 Conversion Optimization Features

### Lead Capture Points
1. **Navbar** - "Calculate Savings" + "Book Consultation" (sticky)
2. **Hero** - Primary CTA button
3. **Calculator Widget** - Embedded on home
4. **State Cards** - Click to explore (micro-conversion)
5. **Case Studies** - "Schedule Consultation" CTA
6. **FAQ** - "Contact Our Team" at bottom
7. **Footer** - Multiple contact options
8. **Contact Page** - Comprehensive lead form

### Persuasion Elements
- ✅ Social proof (10,000+ consumers, ₹500Cr+ savings)
- ✅ Trust indicators (KERC/MSERC approved)
- ✅ Animated counters for credibility
- ✅ Real case studies with financial data
- ✅ Personalized savings calculator
- ✅ Clear value proposition
- ✅ Risk removal (free consultation, no obligation)

## 🎯 Conversion Funnel

```
Visitor Lands on Home
    ↓
Sees Hero + Quick Value Prop
    ↓
Tries Embedded Calculator
    ↓
Sees Personalized Savings
    ↓
Clicks "View Detailed Calculator"
    ↓
Gets Exact Projections + Recommendation
    ↓
Clicks "Book Consultation"
    ↓
Fills Lead Form
    ↓
Lead Captured ✅
```

## 📱 Responsive Design

- **Mobile** (320px+): Stacked layout, touch-optimized
- **Tablet** (768px+): 2-column grids
- **Desktop** (1024px+): Multi-column layouts
- **Large** (1280px+): Optimized spacing, full features

## 🚀 Performance Optimizations

- Vite for sub-second HMR
- Code splitting by route
- Lazy-loaded images recommended
- Recharts lazy-loaded for charts-only pages
- Intersection Observer for scroll animations
- CSS-in-JS via Tailwind for minimal overhead

## 📊 Analytics Hooks

Add your analytics to key pages:
- **Page Views**: Home, Calculator, Eligibility, Contact
- **Conversions**: Button clicks, form submissions
- **Micro-conversions**: State card clicks, FAQ expansions

## 🔒 Security

- No backend API calls in this frontend
- Form submissions should POST to your backend
- Add CSRF protection to contact form
- Sanitize any user-generated content
- Use HTTPS in production

## 📝 SEO

- Semantic HTML structure
- Meta descriptions in HTML
- Heading hierarchy maintained
- Mobile-first responsive
- Fast load times (Vite)
- Add sitemap.xml and robots.txt before deployment

## 📧 Contact Form Handling

Update `/src/pages/Contact.jsx` to integrate with your backend:

```javascript
// Example: Add to handleSubmit
const response = await fetch('/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

## 🎉 Future Enhancements

- [ ] Multi-language support (Hindi, regional languages)
- [ ] Live chat widget
- [ ] Video testimonials
- [ ] Blog integration
- [ ] Integration with project management system
- [ ] WhatsApp CTA button
- [ ] Virtual site assessment tool
- [ ] Subsidy eligibility pre-checker
- [ ] Installment plan calculator
- [ ] Partnership opportunities section

## 📞 Support & Customization

This is a starter template. To customize for your specific needs:
1. Update company branding and colors
2. Replace case study data with real projects
3. Integrate backend APIs for form submission
4. Add your company's specific regulations
5. Implement analytics tracking
6. Deploy to your hosting

## 📄 License

This template is provided as-is for your company's use.

---

Built with ❤️ for clean energy adoption
