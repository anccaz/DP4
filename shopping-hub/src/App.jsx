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

  // Orders & Return State
  const [orders, setOrders] = useState([
    {
      id: '#1042',
      productName: 'Comfort Walking Shoes',
      store: 'Sample Store',
      deliveryDate: 'Delivered October 10',
      totalPaid: 59.99,
      status: 'Delivered',
      returnInitiated: false,
      returnMethod: 'Drop-off at local store',
      trackingCode: 'TRK-98234710-SH'
    }
  ]);
  const [selectedReturnMethod, setSelectedReturnMethod] = useState('drop-off');

  // Navigation & Action Handlers
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setCurrentView('search');
  };

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    setCurrentView('details');
  };

  const toggleCompareCheckbox = (id) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter((item) => item !== id));
    } else {
      if (selectedForCompare.length < 2) {
        setSelectedForCompare([...selectedForCompare, id]);
      }
    }
  };

  const handlePostQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    setLastSubmittedQuestion(newQuestionText);
    setQuestions([
      ...questions,
      {
        q: newQuestionText,
        a: 'Status: Waiting for a buyer response'
      }
    ]);
    setCurrentView('submitted');
  };

  const handleConfirmReturn = () => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === '#1042'
          ? { ...ord, returnInitiated: true, returnMethod: selectedReturnMethod === 'drop-off' ? 'Store Drop-off' : 'Courier Pickup' }
          : ord
      )
    );
    setCurrentView('returnConfirm');
  };

  // Styling system matching wireframe screenshots
  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      color: '#1e293b'
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 48px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0'
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      fontSize: '22px',
      fontWeight: '700',
      color: '#1e293b'
    },
    logoCircle: {
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      backgroundColor: '#fbb034'
    },
    navLinks: {
      display: 'flex',
      gap: '32px',
      fontSize: '15px',
      fontWeight: '500'
    },
    navLink: (active) => ({
      cursor: 'pointer',
      color: active ? '#1e293b' : '#475569',
      borderBottom: active ? '2px solid #fbb034' : '2px solid transparent',
      paddingBottom: '4px',
      transition: 'all 0.2s'
    }),
    main: {
      maxWidth: '1080px',
      margin: '0 auto',
      padding: '40px 24px'
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      padding: '36px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
    },
    yellowBtn: {
      backgroundColor: '#fab633',
      color: '#1e293b',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '15px',
      cursor: 'pointer',
      transition: 'background 0.2s'
    },
    grayBtn: {
      backgroundColor: '#eef2f6',
      color: '#1e293b',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '500',
      fontSize: '15px',
      cursor: 'pointer'
    },
    outlineBtn: {
      backgroundColor: '#ffffff',
      color: '#1e293b',
      border: '1px solid #cbd5e1',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: '500',
      fontSize: '14px',
      cursor: 'pointer'
    },
    pageHeading: {
      fontSize: '32px',
      fontWeight: '800',
      color: '#1e293b',
      marginTop: '6px',
      marginBottom: '28px'
    },
    subLabel: {
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '0.05em',
      color: '#64748b',
      textTransform: 'uppercase'
    }
  };

  return (
    <div style={styles.container}>
      {/* Universal Desktop Header Navigation */}
      <header style={styles.nav}>
        <div style={styles.brand} onClick={() => setCurrentView('home')}>
          <div style={styles.logoCircle}></div>
          <span>Shopping Hub</span>
        </div>
        <nav style={styles.navLinks}>
          <span style={styles.navLink(currentView === 'home')} onClick={() => setCurrentView('home')}>Home</span>
          <span style={styles.navLink(currentView === 'orders' || currentView === 'track' || currentView === 'return' || currentView === 'returnConfirm')} onClick={() => setCurrentView('orders')}>My Orders</span>
          <span style={styles.navLink(currentView === 'ask' || currentView === 'submitted')} onClick={() => setCurrentView('ask')}>Messages</span>
          <span style={styles.navLink(currentView === 'settings')} onClick={() => setCurrentView('settings')}>Settings</span>
        </nav>
      </header>

      <main style={styles.main}>
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <div>
            <div style={styles.card}>
              <span style={styles.subLabel}>Shop with confidence</span>
              <h1 style={{ fontSize: '38px', fontWeight: '800', margin: '10px 0 12px 0', color: '#1e293b' }}>
                What are you looking for?
              </h1>
              <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '28px' }}>
                Find products, compare prices, and manage orders in one simple place.
              </p>
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Search for walking shoes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '16px 20px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                <button type="submit" style={styles.yellowBtn}>Search</button>
              </form>
            </div>

            <div style={{ marginTop: '36px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '18px' }}>Quick actions</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <div
                  style={{ ...styles.card, padding: '24px', cursor: 'pointer' }}
                  onClick={() => setCurrentView('search')}
                >
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '17px', fontWeight: '600' }}>Find products →</h4>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Search online and nearby</p>
                </div>
                <div
                  style={{ ...styles.card, padding: '24px', cursor: 'pointer' }}
                  onClick={() => setCurrentView('track')}
                >
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '17px', fontWeight: '600' }}>Track an order →</h4>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Check delivery progress</p>
                </div>
                <div
                  style={{ ...styles.card, padding: '24px', cursor: 'pointer' }}
                  onClick={() => setCurrentView('return')}
                >
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '17px', fontWeight: '600' }}>Start a return →</h4>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Return an earlier purchase</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SEARCH RESULTS PAGE */}
        {currentView === 'search' && (
          <div>
            <span style={styles.subLabel}>Search products</span>
            <h1 style={styles.pageHeading}>Results for &ldquo;walking shoes&rdquo;</h1>

            <div style={{ display: 'flex', gap: '24px' }}>
              {/* Filter Sidebar */}
              <div style={{ width: '260px' }}>
                <div style={{ ...styles.card, padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>Filters</h3>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '14px' }}>Price range</div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', color: '#475569' }}>
                      <input type="checkbox" checked={filterPrice} onChange={(e) => setFilterPrice(e.target.checked)} />
                      Under $75
                    </label>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '14px' }}>Availability</div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', marginBottom: '6px', color: '#475569' }}>
                      <input type="checkbox" checked={filterPickup} onChange={(e) => setFilterPickup(e.target.checked)} />
                      Local pickup
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', color: '#475569' }}>
                      <input type="checkbox" checked={filterOnline} onChange={(e) => setFilterOnline(e.target.checked)} />
                      Online delivery
                    </label>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: '14px' }}>Shipping</div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', color: '#475569' }}>
                      <input type="checkbox" checked={filterFreeShipping} onChange={(e) => setFilterFreeShipping(e.target.checked)} />
                      Free shipping
                    </label>
                  </div>

                  <button style={{ ...styles.yellowBtn, width: '100%' }}>Choose filters</button>
                </div>
              </div>

              {/* Product List */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '18px', fontWeight: '700' }}>2 products found</span>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>Sort: Lowest total price</span>
                </div>

                {PRODUCTS.slice(0, 2).map((prod) => (
                  <div key={prod.id} style={{ ...styles.card, padding: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ width: '90px', height: '90px', backgroundColor: '#eef2f6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: '#64748b' }}>
                        PRODUCT
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '700' }}>{prod.name}</h4>
                        <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
                          {prod.store} • {prod.availability}
                        </div>
                        <div style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>${prod.price.toFixed(2)}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '150px' }}>
                      <button style={styles.yellowBtn} onClick={() => handleSelectProduct(prod)}>View details</button>
                      <button
                        style={{ ...styles.grayBtn, backgroundColor: selectedForCompare.includes(prod.id) ? '#cbd5e1' : '#eef2f6' }}
                        onClick={() => toggleCompareCheckbox(prod.id)}
                      >
                        {selectedForCompare.includes(prod.id) ? 'Selected ✓' : 'Select product'}
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  style={{ ...styles.grayBtn, marginTop: '8px' }}
                  onClick={() => setCurrentView('compare')}
                >
                  Compare selected products ({selectedForCompare.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: PRODUCT DETAILS PAGE */}
        {currentView === 'details' && (
          <div>
            <span style={styles.subLabel}>Product Details</span>
            <h1 style={styles.pageHeading}>{selectedProduct.name}</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '32px' }}>
              <div style={{ ...styles.card, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '380px' }}>
                <div style={{ width: '160px', height: '160px', borderRadius: '50%', backgroundColor: '#eef2f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                </div>
                <span style={{ fontSize: '15px', color: '#64748b', fontWeight: '500' }}>Product photo</span>
              </div>

              <div style={styles.card}>
                <h2 style={{ fontSize: '26px', fontWeight: '700', margin: '0 0 8px 0' }}>{selectedProduct.name}</h2>
                <div style={{ color: '#16a34a', fontWeight: '600', fontSize: '14px', marginBottom: '16px' }}>
                  Sold by {selectedProduct.store} • In stock
                </div>
                <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '4px' }}>${selectedProduct.price.toFixed(2)}</div>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>Price shown before tax • Local pickup: FREE</div>

                <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />

                <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5', marginBottom: '28px' }}>
                  Available from a local store; online delivery options are also offered.
                </p>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={styles.grayBtn} onClick={() => setCurrentView('compare')}>Select products</button>
                  <button style={styles.yellowBtn} onClick={() => setCurrentView('ask')}>Ask previous buyers</button>
                  <button style={styles.grayBtn}>Buying options</button>
                </div>
              </div>
            </div>

            <button style={{ ...styles.outlineBtn, marginTop: '24px' }} onClick={() => setCurrentView('search')}>
              ← Back to results
            </button>
          </div>
        )}

        {/* VIEW 4: ASK PREVIOUS BUYERS Q&A */}
        {currentView === 'ask' && (
          <div>
            <h1 style={{ ...styles.pageHeading, marginTop: '0' }}>Ask Previous Buyers</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px' }}>
              <div style={styles.card}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Questions and answers</h3>
                
                {questions.map((item, index) => (
                  <div key={index} style={{ backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '18px', marginBottom: '24px' }}>
                    <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '6px' }}>Q: {item.q}</div>
                    <div style={{ fontSize: '14px', color: '#334155' }}>
                      {item.a.includes('Verified Buyer') ? (
                        <>A: I use them on daily walks and find them comfortable. — <span style={{ color: '#16a34a', fontWeight: '700' }}>Verified Buyer ✓</span></>
                      ) : (
                        item.a
                      )}
                    </div>
                  </div>
                ))}

                <form onSubmit={handlePostQuestion}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '16px', marginBottom: '12px' }}>
                    Ask a question about this product
                  </label>
                  <input
                    type="text"
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '15px',
                      marginBottom: '20px',
                      boxSizing: 'border-box'
                    }}
                  />

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="submit" style={styles.yellowBtn}>Submit question</button>
                    <button type="button" style={styles.grayBtn} onClick={() => setCurrentView('details')}>Cancel</button>
                  </div>
                </form>
              </div>

              <div style={styles.card}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '18px' }}>Verified buyer Q&A</h3>
                <ul style={{ paddingLeft: '20px', color: '#334155', fontSize: '14px', lineHeight: '1.8', margin: '0 0 24px 0' }}>
                  <li>Only verified purchasers of this product can post replies.</li>
                  <li>All shoppers can ask a product question.</li>
                  <li>Responses display a verified-purchase badge.</li>
                  <li>Replies are not instant.</li>
                  <li>Messages are not live chat.</li>
                </ul>

                <button style={{ ...styles.grayBtn, width: '100%', cursor: 'not-allowed', color: '#64748b' }} disabled>
                  🔒 Reply — verified purchasers only
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: QUESTION SUBMITTED CONFIRMATION */}
        {currentView === 'submitted' && (
          <div>
            <h1 style={styles.pageHeading}>Question submitted</h1>
            <div style={{ ...styles.card, maxWidth: '640px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
                <span>✓</span>
                <span>Your question was posted</span>
              </div>

              <div style={{ backgroundColor: '#f1f5f9', borderRadius: '10px', padding: '20px', marginBottom: '24px' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
                  {lastSubmittedQuestion || 'Do these shoes run true to size?'}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>
                  Status: Waiting for a buyer response
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={styles.yellowBtn} onClick={() => setCurrentView('details')}>View buying options</button>
                <button style={styles.grayBtn} onClick={() => setCurrentView('details')}>Back to product</button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 6: PRODUCT COMPARISON MATRIX */}
        {currentView === 'compare' && (
          <div>
            <span style={styles.subLabel}>Decision Support</span>
            <h1 style={styles.pageHeading}>Product Comparison</h1>

            <div style={{ ...styles.card, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '15px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '16px' }}>Feature</th>
                    <th style={{ padding: '16px' }}>{PRODUCTS[0].name}</th>
                    <th style={{ padding: '16px' }}>{PRODUCTS[1].name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px', fontWeight: '600' }}>Price</td>
                    <td style={{ padding: '16px', fontSize: '18px', fontWeight: '700', color: '#fab633' }}>${PRODUCTS[0].price}</td>
                    <td style={{ padding: '16px', fontSize: '18px', fontWeight: '700', color: '#fab633' }}>${PRODUCTS[1].price}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px', fontWeight: '600' }}>Cushioning</td>
                    <td style={{ padding: '16px' }}>{PRODUCTS[0].specs.cushioning}</td>
                    <td style={{ padding: '16px' }}>{PRODUCTS[1].specs.cushioning}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px', fontWeight: '600' }}>Outsole</td>
                    <td style={{ padding: '16px' }}>{PRODUCTS[0].specs.sole}</td>
                    <td style={{ padding: '16px' }}>{PRODUCTS[1].specs.sole}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px', fontWeight: '600' }}>Weight</td>
                    <td style={{ padding: '16px' }}>{PRODUCTS[0].specs.weight}</td>
                    <td style={{ padding: '16px' }}>{PRODUCTS[1].specs.weight}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '16px', fontWeight: '600' }}>Action</td>
                    <td style={{ padding: '16px' }}>
                      <button style={styles.yellowBtn} onClick={() => handleSelectProduct(PRODUCTS[0])}>Select this</button>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <button style={styles.outlineBtn} onClick={() => handleSelectProduct(PRODUCTS[1])}>Select this</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button style={{ ...styles.outlineBtn, marginTop: '24px' }} onClick={() => setCurrentView('search')}>
              ← Back to search results
            </button>
          </div>
        )}

        {/* VIEW 7: MY ORDERS */}
        {currentView === 'orders' && (
          <div>
            <span style={styles.subLabel}>Order history</span>
            <h1 style={styles.pageHeading}>My Orders</h1>
            <p style={{ color: '#64748b', fontSize: '15px', marginTop: '-20px', marginBottom: '24px' }}>
              All your participating-store purchases in one place.
            </p>

            <div style={styles.card}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <span style={{ fontSize: '18px', fontWeight: '700' }}>Your purchases</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ ...styles.grayBtn, padding: '8px 16px', fontSize: '14px' }}>All orders</button>
                  <button style={{ ...styles.grayBtn, padding: '8px 16px', fontSize: '14px', backgroundColor: '#e2e8f0' }}>Delivered</button>
                </div>
              </div>

              {orders.map((ord) => (
                <div key={ord.id} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ width: '90px', height: '90px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: '#64748b' }}>
                      PRODUCT
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700' }}>{ord.productName}</h4>
                      <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '6px' }}>Order {ord.id} • {ord.store}</div>
                      <div style={{ color: '#16a34a', fontWeight: '700', fontSize: '14px', marginBottom: '6px' }}>{ord.deliveryDate}</div>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>Total paid: ${ord.totalPaid.toFixed(2)}</div>
                      {ord.returnInitiated && (
                        <div style={{ marginTop: '8px', color: '#ea580c', fontSize: '13px', fontWeight: '600' }}>
                          Return status: {ord.returnMethod} requested
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '160px' }}>
                    <button style={styles.yellowBtn} onClick={() => setCurrentView('return')}>
                      {ord.returnInitiated ? 'View return slip' : 'Return purchase'}
                    </button>
                    <button style={styles.grayBtn} onClick={() => setCurrentView('track')}>Track delivery</button>
                  </div>
                </div>
              ))}

              <button style={styles.outlineBtn} onClick={() => setCurrentView('home')}>
                ← Back to home
              </button>
            </div>
          </div>
        )}

        {/* VIEW 8: TRACK ORDER */}
        {currentView === 'track' && (
          <div>
            <span style={styles.subLabel}>Delivery Progress</span>
            <h1 style={styles.pageHeading}>Track Delivery</h1>

            <div style={styles.card}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '6px' }}>Comfort Walking Shoes</h3>
              <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Order #1042 • Tracking ID: TRK-98234710-SH</div>

              {/* Progress Milestones */}
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', margin: '40px 0' }}>
                <div style={{ textAlign: 'center', zIndex: 1 }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#16a34a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto', fontWeight: 'bold' }}>✓</div>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>Order Placed</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Oct 7</div>
                </div>
                <div style={{ textAlign: 'center', zIndex: 1 }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#16a34a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto', fontWeight: 'bold' }}>✓</div>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>Shipped</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Oct 8</div>
                </div>
                <div style={{ textAlign: 'center', zIndex: 1 }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#16a34a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto', fontWeight: 'bold' }}>✓</div>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>Out for Delivery</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Oct 10</div>
                </div>
                <div style={{ textAlign: 'center', zIndex: 1 }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#16a34a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto', fontWeight: 'bold' }}>✓</div>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>Delivered</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Oct 10, 2:15 PM</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button style={styles.yellowBtn} onClick={() => setCurrentView('return')}>Start a return</button>
                <button style={styles.outlineBtn} onClick={() => setCurrentView('orders')}>Back to My Orders</button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 9: RETURN PURCHASE FLOW */}
        {currentView === 'return' && (
          <div>
            <span style={styles.subLabel}>Returns & Refunds</span>
            <h1 style={styles.pageHeading}>Start a Return</h1>

            <div style={{ ...styles.card, maxWidth: '680px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Select return method for Order #1042</h3>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
                Item: Comfort Walking Shoes ($59.99)
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px', borderRadius: '8px', border: selectedReturnMethod === 'drop-off' ? '2px solid #fab633' : '1px solid #cbd5e1', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="returnMethod"
                    value="drop-off"
                    checked={selectedReturnMethod === 'drop-off'}
                    onChange={() => setSelectedReturnMethod('drop-off')}
                    style={{ marginTop: '3px' }}
                  />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '15px' }}>Drop-off at local store (Immediate Refund)</div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>Bring barcode label to any participating Sample Store location.</div>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px', borderRadius: '8px', border: selectedReturnMethod === 'pickup' ? '2px solid #fab633' : '1px solid #cbd5e1', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="returnMethod"
                    value="pickup"
                    checked={selectedReturnMethod === 'pickup'}
                    onChange={() => setSelectedReturnMethod('pickup')}
                    style={{ marginTop: '3px' }}
                  />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '15px' }}>Carrier Pickup (Printable Shipping Label)</div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>A prepaid return shipping label will be generated for courier pickup.</div>
                  </div>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={styles.yellowBtn} onClick={handleConfirmReturn}>Generate return label</button>
                <button style={styles.grayBtn} onClick={() => setCurrentView('orders')}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 10: RETURN CONFIRMATION WITH PRINTABLE LABEL */}
        {currentView === 'returnConfirm' && (
          <div>
            <h1 style={styles.pageHeading}>Return label ready</h1>

            <div style={{ ...styles.card, maxWidth: '640px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
                <span>✓</span>
                <span>Return authorized for Order #1042</span>
              </div>

              <div style={{ border: '2px dashed #94a3b8', borderRadius: '10px', padding: '24px', backgroundColor: '#f8fafc', marginBottom: '24px', textAlign: 'center' }}>
                <div style={{ fontWeight: '800', letterSpacing: '2px', fontSize: '16px', marginBottom: '4px' }}>SHOPPING HUB RMA RETURN</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>RMA# 99482-RET-2026</div>

                <div style={{ width: '220px', height: '50px', margin: '0 auto 12px auto', background: 'repeating-linear-gradient(90deg, #000, #000 3px, #fff 3px, #fff 6px, #000 6px, #000 10px, #fff 10px, #fff 12px)' }}></div>
                <div style={{ fontFamily: 'monospace', letterSpacing: '3px', fontSize: '14px', fontWeight: 'bold' }}>*1042-99482*</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>Method: {selectedReturnMethod === 'drop-off' ? 'Store Drop-off' : 'Prepaid Carrier Pick-up'}</div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={styles.yellowBtn} onClick={() => window.print()}>Print return label</button>
                <button style={styles.grayBtn} onClick={() => setCurrentView('orders')}>Back to My Orders</button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 11: SETTINGS */}
        {currentView === 'settings' && (
          <div>
            <span style={styles.subLabel}>Settings</span>
            <h1 style={styles.pageHeading}>Your preferences</h1>

            <div style={styles.card}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Display and notifications</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                <div style={{ backgroundColor: '#f1f5f9', padding: '18px 24px', borderRadius: '10px', fontSize: '16px', fontWeight: '500' }}>
                  Text size: Standard
                </div>
                <div style={{ backgroundColor: '#f1f5f9', padding: '18px 24px', borderRadius: '10px', fontSize: '16px', fontWeight: '500' }}>
                  Notifications: Minimal
                </div>
                <div style={{ backgroundColor: '#f1f5f9', padding: '18px 24px', borderRadius: '10px', fontSize: '16px', fontWeight: '500' }}>
                  Recommendations: User-controlled
                </div>
              </div>

              <button style={styles.yellowBtn} onClick={() => setCurrentView('home')}>
                Return to home
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}