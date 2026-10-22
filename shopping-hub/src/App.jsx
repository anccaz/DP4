import React, { useState } from 'react';

// Hardcoded Product Catalog
const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Comfort Walking Shoes',
    store: 'Sample Store',
    price: 59.99,
    availability: 'Local pickup available',
    shipping: 'Free delivery available',
    inStock: true,
    rating: 4.8,
    category: 'walking shoes',
    specs: {
      cushioning: 'High memory foam',
      sole: 'Anti-slip rubber',
      weight: '280g',
      closure: 'Slip-on with laces',
      warranty: '1 Year limited'
    }
  },
  {
    id: 'prod-2',
    name: 'Everyday Walking Shoes',
    store: 'Sample Marketplace',
    price: 69.99,
    availability: 'Online delivery',
    shipping: 'Free shipping over $50',
    inStock: true,
    rating: 4.6,
    category: 'walking shoes',
    specs: {
      cushioning: 'Gel heel support',
      sole: 'Durable composite',
      weight: '310g',
      closure: 'Classic lace-up',
      warranty: '6 Months'
    }
  },
  {
    id: 'prod-3',
    name: 'Senior Easy-Grip Walking Cane',
    store: 'CarePlus Direct',
    price: 24.99,
    availability: 'Local pickup available',
    shipping: 'Standard shipping',
    inStock: true,
    category: 'mobility',
    specs: {
      cushioning: 'Ergonomic soft grip',
      sole: 'Quad-rubber base',
      weight: '450g',
      closure: 'Foldable lock-pin',
      warranty: '2 Years'
    }
  },
  {
    id: 'prod-4',
    name: 'Large-Button Cell Phone',
    store: 'SimpleTech Hub',
    price: 49.99,
    availability: 'Online delivery',
    shipping: 'Free shipping',
    inStock: true,
    category: 'electronics',
    specs: {
      cushioning: 'Shockproof rubber casing',
      sole: 'N/A',
      weight: '160g',
      closure: 'Flip design',
      warranty: '1 Year limited'
    }
  }
];

export default function App() {
  // Navigation & Screen View State
  const [currentView, setCurrentView] = useState('home'); // home | search | details | ask | submitted | compare | orders | track | return | returnConfirm | settings
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [selectedForCompare, setSelectedForCompare] = useState(['prod-1']);

  // Filters State
  const [filterPrice, setFilterPrice] = useState(false);
  const [filterPickup, setFilterPickup] = useState(false);
  const [filterOnline, setFilterOnline] = useState(false);
  const [filterFreeShipping, setFilterFreeShipping] = useState(false);

  // Q&A State
  const [questions, setQuestions] = useState([
    {
      q: 'Are these comfortable for daily walking?',
      a: 'I use them on daily walks and find them comfortable. — Verified Buyer ✓'
    }
  ]);
  const [newQuestionText, setNewQuestionText] = useState('Do these shoes run true to size?');
  const [lastSubmittedQuestion, setLastSubmittedQuestion] = useState('');
}
