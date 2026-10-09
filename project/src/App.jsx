import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { useReveal } from './hooks/useReveal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Pricing from './components/Pricing';
import HowItWorks from './components/HowItWorks';
import Advantages from './components/Advantages';
import CTA from './components/CTA';
import Footer from './components/Footer';
import OrderForm from './components/OrderForm';
import AdminPanel from './components/AdminPanel';
import './App.css';

const PHONE_NUMBER = '+998333649919';

function AppContent() {
  useReveal();
  const { t } = useApp();
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');

  const isAdmin = window.location.pathname.startsWith('/admin');

  const openOrder = (model) => {
    setSelectedModel(model || '');
    setOrderOpen(true);
    setTimeout(() => {
      document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const closeOrder = () => {
    setOrderOpen(false);
    setSelectedModel('');
  };

  useEffect(() => {
    document.title = 'Mobil Moyka — Moykachi sizning oldingizga boradi';
  }, []);

  if (isAdmin) {
    return <AdminPanel />;
  }

  return (
    <>
      <Navbar onOrderClick={() => openOrder('')} />
      <main>
        <Hero onOrderClick={() => openOrder('')} />
        <ProblemSolution />
        <Pricing onOrderClick={openOrder} />
        <HowItWorks />
        <Advantages />
        <CTA onOrderClick={() => openOrder('')} />
        {orderOpen && (
          <OrderForm
            initialModel={selectedModel}
            onSubmitted={closeOrder}
            onClose={closeOrder}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
