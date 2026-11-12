import React, { useMemo, useRef, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { CatalogSection } from './components/CatalogSection';
import { ContactSection } from './components/ContactSection';
import { FloatingContactButton } from './components/FloatingContactButton';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SelectionDrawer } from './components/SelectionDrawer';
import type { ReadingService, SelectedReading } from './types';

export default function App() {
  const [selectedReadings, setSelectedReadings] = useState<SelectedReading[]>([]);
  const [selectionDrawerOpen, setSelectionDrawerOpen] = useState(false);
  const [activeService, setActiveService] = useState<ReadingService | null>(null);
  const contactNameInputRef = useRef<HTMLInputElement | null>(null);

  const totalItems = useMemo(
    () => selectedReadings.reduce((acc, item) => acc + item.quantity, 0),
    [selectedReadings],
  );

  const handleAddReading = (service: ReadingService) => {
    setSelectedReadings((prev) => {
      const existing = prev.find((item) => item.service.id === service.id);
      if (existing) {
        return prev.map((item) =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { service, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (serviceId: string, delta: number) => {
    setSelectedReadings((prev) =>
      prev
        .map((item) =>
          item.service.id === serviceId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleClearSelection = () => {
    setSelectedReadings([]);
  };

  const handleNavigateContact = () => {
    const contactEl = document.getElementById('contato');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
      window.setTimeout(() => {
        contactNameInputRef.current?.focus({ preventScroll: true });
      }, 450);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header
        totalItems={totalItems}
        onOpenSelection={() => setSelectionDrawerOpen(true)}
        onNavigateContact={handleNavigateContact}
      />

      <main className="flex-1">
        <HeroSection onNavigateContact={handleNavigateContact} />

        <CatalogSection
          selectedReadings={selectedReadings}
          onAddReading={handleAddReading}
          onUpdateQuantity={handleUpdateQuantity}
          onOpenReadingDetail={(service) => setActiveService(service)}
          onOpenSelection={() => setSelectionDrawerOpen(true)}
          onNavigateContact={handleNavigateContact}
        />

        <AboutSection onNavigateContact={handleNavigateContact} />

        <ContactSection
          selectedReadings={selectedReadings}
          onUpdateQuantity={handleUpdateQuantity}
          onClearSelection={handleClearSelection}
          nameInputRef={contactNameInputRef}
        />
      </main>

      <Footer />

      <FloatingContactButton onClick={handleNavigateContact} />

      <SelectionDrawer
        open={selectionDrawerOpen}
        onClose={() => setSelectionDrawerOpen(false)}
        selectedReadings={selectedReadings}
        onUpdateQuantity={handleUpdateQuantity}
        onClearSelection={handleClearSelection}
        onProceedToContact={handleNavigateContact}
      />

      <ProductDetailModal
        service={activeService}
        onClose={() => setActiveService(null)}
        onAddReading={handleAddReading}
        onNavigateContact={handleNavigateContact}
      />
    </div>
  );
}
