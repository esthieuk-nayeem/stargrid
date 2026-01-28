"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadAnswers, loadScoringData } from "@/lib/answerStorage";
import { matchProducts } from "@/lib/supabase";

export default function EnhancedResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: 'all',
    technology: 'all',
    provider: 'all',
    minScore: 40
  });
  const [sortBy, setSortBy] = useState('match');

  const productsPerPage = 9;

  useEffect(() => {
    loadResults();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters, sortBy]);

  const loadResults = async () => {
    try {
      setLoading(true);
      const answers = loadAnswers();
      const scoring = loadScoringData();

      const response = await matchProducts(answers, scoring);
      setProducts(response.products || []);
      setFilteredProducts(response.products || []);
    } catch (error) {
      console.error('Error loading results:', error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.Product_Category === filters.category);
    }

    if (filters.technology !== 'all') {
      filtered = filtered.filter(p => 
        p.Connectivity_Technology?.toLowerCase().includes(filters.technology.toLowerCase())
      );
    }

    if (filters.provider !== 'all') {
      filtered = filtered.filter(p => p.Provider === filters.provider);
    }

    filtered = filtered.filter(p => p.matchScore >= filters.minScore);

    if (sortBy === 'match') {
      filtered.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.Product_Name.localeCompare(b.Product_Name));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleBookMeeting = () => {
    const productIds = selectedProducts.join(',');
    router.push(`/book-meeting?products=${productIds}`);
  };

  const categories = ['all', ...new Set(products.map(p => p.Product_Category).filter(Boolean))];
  const technologies = ['all', ...new Set(products.map(p => p.Connectivity_Technology).filter(Boolean))];
  const providers = ['all', ...new Set(products.map(p => p.Provider).filter(Boolean))];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="results-page">
      <div className="results-page__bg-shape"></div>
      <div className="results-page__bg-shape-2"></div>

      <div className="container">
        <div className="results-page__inner">
          <ResultsHeader count={filteredProducts.length} />
          
          <FiltersSection
            filters={filters}
            sortBy={sortBy}
            onFilterChange={handleFilterChange}
            onSortChange={setSortBy}
            categories={categories}
            technologies={technologies}
            providers={providers}
          />

          {selectedProducts.length > 0 && (
            <SelectionBanner
              count={selectedProducts.length}
              onBookMeeting={handleBookMeeting}
            />
          )}

          <ProductsGrid
            products={currentProducts}
            selectedProducts={selectedProducts}
            onToggleSelect={toggleProductSelection}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          <ActionsFooter onBookMeeting={handleBookMeeting} router={router} />
        </div>
      </div>

      <style jsx global>{`
        .results-page {
          position: relative;
          min-height: 100vh;
          background-color: var(--techguru-black);
          padding: 80px 0;
          overflow: hidden;
        }

        .results-page__bg-shape {
          position: absolute;
          width: 927px;
          height: 927px;
          right: -270px;
          top: -40px;
          background: radial-gradient(50% 50% at 50% 50%, rgba(22, 14, 255, 0.1539) 0%, rgba(22, 14, 255, 0) 87.1%);
          z-index: 0;
        }

        .results-page__bg-shape-2 {
          position: absolute;
          left: 24.95%;
          right: 24.95%;
          top: 30%;
          bottom: -11.72%;
          opacity: .30;
          filter: blur(120px);
          background: radial-gradient(50% 50% at 50% 50%, #6669D8 0%, rgba(7, 12, 20, 0) 100%);
          z-index: 0;
        }

        .results-page__inner {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .results-page {
            padding: 40px 0;
          }
        }
      `}</style>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="results-page results-page--loading">
      <div className="container">
        <div className="results-page__loading">
          <div className="results-page__spinner"></div>
          <h2>Analyzing Your Requirements...</h2>
          <p>Finding the perfect connectivity solutions</p>
        </div>
      </div>

      <style jsx>{`
        .results-page--loading {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--techguru-black);
        }

        .results-page__loading {
          text-align: center;
        }

        .results-page__spinner {
          width: 80px;
          height: 80px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top-color: #3D72FC;
          border-radius: 50%;
          margin: 0 auto 30px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .results-page__loading h2 {
          font-size: 32px;
          font-weight: 700;
          color: var(--techguru-white);
          margin-bottom: 12px;
        }

        .results-page__loading p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
}

function ResultsHeader({ count }) {
  return (
    <div className="results-page__header">
      <div className="results-page__success-icon">
        <span>✓</span>
      </div>
      <h1>Your Personalized Recommendations</h1>
      <p>Based on your requirements, we've identified {count} solutions that match your needs</p>

      <style jsx>{`
        .results-page__header {
          text-align: center;
          margin-bottom: 60px;
        }

        .results-page__success-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          margin-bottom: 30px;
          animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-size: 50px;
          color: white;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .results-page__header h1 {
          font-size: 42px;
          font-weight: 700;
          color: var(--techguru-white);
          margin-bottom: 16px;
          background: linear-gradient(270deg, #5CB0E9 0%, #3D72FC 100%);
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .results-page__header p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .results-page__header h1 {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
  );
}

function FiltersSection({ filters, sortBy, onFilterChange, onSortChange, categories, technologies, providers }) {
  return (
    <div className="results-page__controls">
      <div className="results-page__filters">
        <select 
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="results-page__filter"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        <select 
          value={filters.technology}
          onChange={(e) => onFilterChange('technology', e.target.value)}
          className="results-page__filter"
        >
          {technologies.map(tech => (
            <option key={tech} value={tech}>
              {tech === 'all' ? 'All Technologies' : tech}
            </option>
          ))}
        </select>

        <select 
          value={filters.provider}
          onChange={(e) => onFilterChange('provider', e.target.value)}
          className="results-page__filter"
        >
          {providers.map(prov => (
            <option key={prov} value={prov}>
              {prov === 'all' ? 'All Providers' : prov}
            </option>
          ))}
        </select>

        <div className="results-page__score-filter">
          <label>Min Match: {filters.minScore}%</label>
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={filters.minScore}
            onChange={(e) => onFilterChange('minScore', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="results-page__sort">
        <select 
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="results-page__filter"
        >
          <option value="match">Sort by Match Score</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      <style jsx>{`
        .results-page__controls {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .results-page__filters {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          flex: 1;
        }

        .results-page__filter {
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          color: var(--techguru-white);
          font-size: 14px;
          outline: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .results-page__filter:hover,
        .results-page__filter:focus {
          border-color: #3D72FC;
          background: rgba(255, 255, 255, 0.08);
        }

        .results-page__score-filter {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .results-page__score-filter label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }

        .results-page__score-filter input[type="range"] {
          width: 150px;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          outline: none;
          -webkit-appearance: none;
        }

        .results-page__score-filter input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border-radius: 50%;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .results-page__controls {
            flex-direction: column;
            align-items: stretch;
          }

          .results-page__filters {
            flex-direction: column;
          }

          .results-page__filter {
            width: 100%;
          }

          .results-page__score-filter input[type="range"] {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

function SelectionBanner({ count, onBookMeeting }) {
  return (
    <div className="results-page__selection-banner">
      <div className="results-page__selection-info">
        <span>✓</span>
        {count} product{count !== 1 ? 's' : ''} selected
      </div>
      <button className="results-page__book-btn" onClick={onBookMeeting}>
        <span>📅</span>
        Book a Meeting
      </button>

      <style jsx>{`
        .results-page__selection-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          background: linear-gradient(135deg, rgba(61, 114, 252, 0.2) 0%, rgba(92, 176, 233, 0.2) 100%);
          border: 1px solid #3D72FC;
          border-radius: 16px;
          margin-bottom: 30px;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .results-page__selection-info {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 16px;
          font-weight: 600;
          color: var(--techguru-white);
        }

        .results-page__selection-info span {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border-radius: 50%;
          font-size: 14px;
        }

        .results-page__book-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .results-page__book-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(61, 114, 252, 0.4);
        }

        @media (max-width: 768px) {
          .results-page__selection-banner {
            flex-direction: column;
            gap: 16px;
          }

          .results-page__book-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

function ProductsGrid({ products, selectedProducts, onToggleSelect }) {
  if (products.length === 0) {
    return (
      <div className="results-page__no-results">
        <div className="results-page__no-results-icon">🔍</div>
        <h3>No products match your current filters</h3>
        <p>Try adjusting your filter criteria</p>

        <style jsx>{`
          .results-page__no-results {
            text-align: center;
            padding: 80px 20px;
          }

          .results-page__no-results-icon {
            font-size: 64px;
            margin-bottom: 24px;
          }

          .results-page__no-results h3 {
            font-size: 24px;
            font-weight: 600;
            color: var(--techguru-white);
            margin-bottom: 12px;
          }

          .results-page__no-results p {
            font-size: 16px;
            color: rgba(255, 255, 255, 0.6);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="results-page__products">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          isSelected={selectedProducts.includes(product.id)}
          onToggleSelect={() => onToggleSelect(product.id)}
        />
      ))}

      <style jsx>{`
        .results-page__products {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        @media (max-width: 768px) {
          .results-page__products {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

function ProductCard({ product, index, isSelected, onToggleSelect }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className={`product-card ${isSelected ? 'product-card--selected' : ''}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="product-card__select">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="product-card__checkbox"
        />
      </div>

      <div className="product-card__header">
        <div className="product-card__match-badge">
          {product.matchScore}% Match
        </div>
        {index === 0 && !isSelected && (
          <div className="product-card__recommended-badge">
            Top Match
          </div>
        )}
      </div>

      <h3 className="product-card__name">{product.Product_Name}</h3>
      
      <div className="product-card__provider">
        <span>Provider:</span> {product.Provider || 'N/A'}
      </div>

      <div className="product-card__specs">
        {product.Monthly_Data_GB && (
          <div className="product-card__spec">
            <span className="label">Data:</span>
            <span className="value">{product.Monthly_Data_GB} GB/mo</span>
          </div>
        )}
        {product.Download_Mbit_s && (
          <div className="product-card__spec">
            <span className="label">Download:</span>
            <span className="value">{product.Download_Mbit_s} Mbps</span>
          </div>
        )}
        {product.Latency_Class_ms && (
          <div className="product-card__spec">
            <span className="label">Latency:</span>
            <span className="value">{product.Latency_Class_ms}ms</span>
          </div>
        )}
        {product.Availability_SLA_Percent && (
          <div className="product-card__spec">
            <span className="label">SLA:</span>
            <span className="value">{product.Availability_SLA_Percent}%</span>
          </div>
        )}
      </div>

      {product.matchReasons && product.matchReasons.length > 0 && (
        <div className="product-card__reasons">
          <h4>Why this matches:</h4>
          <ul>
            {product.matchReasons.slice(0, expanded ? undefined : 3).map((reason, i) => (
              <li key={i}>✓ {reason}</li>
            ))}
          </ul>
          {product.matchReasons.length > 3 && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="product-card__expand-btn"
            >
              {expanded ? 'Show less' : `+${product.matchReasons.length - 3} more`}
            </button>
          )}
        </div>
      )}

      <style jsx>{`
        .product-card {
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 30px;
          transition: all 0.3s ease;
          animation: slideUp 0.4s ease-out backwards;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .product-card:hover {
          transform: translateY(-4px);
          border-color: rgba(61, 114, 252, 0.3);
          box-shadow: 0 12px 30px rgba(61, 114, 252, 0.15);
        }

        .product-card--selected {
          border-color: #3D72FC;
          background: rgba(61, 114, 252, 0.08);
        }

        .product-card__select {
          position: absolute;
          top: 20px;
          right: 20px;
        }

        .product-card__checkbox {
          width: 22px;
          height: 22px;
          cursor: pointer;
        }

        .product-card__header {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .product-card__match-badge {
          padding: 6px 14px;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border-radius: 16px;
          font-size: 13px;
          font-weight: 700;
          color: white;
        }

        .product-card__recommended-badge {
          padding: 6px 14px;
          background: rgba(250, 86, 116, 0.2);
          border: 1px solid #FA5674;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 700;
          color: #FA5674;
        }

        .product-card__name {
          font-size: 20px;
          font-weight: 700;
          color: var(--techguru-white);
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .product-card__provider {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 20px;
        }

        .product-card__provider span {
          color: rgba(255, 255, 255, 0.5);
        }

        .product-card__specs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 20px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
        }

        .product-card__spec {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .product-card__spec .label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }

        .product-card__spec .value {
          font-size: 15px;
          font-weight: 600;
          color: var(--techguru-white);
        }

        .product-card__reasons h4 {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 10px;
        }

        .product-card__reasons ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }

        .product-card__reasons li {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
        }

        .product-card__expand-btn {
          background: none;
          border: none;
          color: #5CB0E9;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
        }

        .product-card__expand-btn:hover {
          color: #3D72FC;
        }
      `}</style>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="results-page__pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="results-page__pagination-btn"
      >
        ← Previous
      </button>

      <div className="results-page__pagination-pages">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`results-page__pagination-page ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="results-page__pagination-btn"
      >
        Next →
      </button>

      <style jsx>{`
        .results-page__pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          margin-bottom: 60px;
        }

        .results-page__pagination-btn {
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          color: var(--techguru-white);
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .results-page__pagination-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
          border-color: #3D72FC;
        }

        .results-page__pagination-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .results-page__pagination-pages {
          display: flex;
          gap: 6px;
        }

        .results-page__pagination-page {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          color: var(--techguru-white);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .results-page__pagination-page:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .results-page__pagination-page.active {
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border-color: transparent;
        }

        @media (max-width: 768px) {
          .results-page__pagination {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}

function ActionsFooter({ onBookMeeting, router }) {
  return (
    <div className="results-page__actions">
      <button 
        className="results-page__btn results-page__btn--secondary" 
        onClick={() => router.push('/questionnaire')}
      >
        ← Retake Survey
      </button>
      <button 
        className="results-page__btn results-page__btn--primary"
        onClick={onBookMeeting}
      >
        📅 Book Consultation
      </button>

      <style jsx>{`
        .results-page__actions {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .results-page__btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .results-page__btn--secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--techguru-white);
        }

        .results-page__btn--secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .results-page__btn--primary {
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          color: white;
        }

        .results-page__btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(61, 114, 252, 0.4);
        }

        @media (max-width: 768px) {
          .results-page__actions {
            flex-direction: column;
          }

          .results-page__btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}