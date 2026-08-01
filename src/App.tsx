import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ShopByNeed } from './components/ShopByNeed';
import { ValueProposition } from './components/ValueProposition';
import { EnablementPillars } from './components/EnablementPillars';
import { GroundImpact } from './components/GroundImpact';
import { TwoRolesMovement } from './components/TwoRolesMovement';
import { ImpactEngine } from './components/ImpactEngine';
import { ServiceHub } from './components/ServiceHub';
import { FinalBanner } from './components/FinalBanner';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';
import { ModalType, CategoryItem } from './types';
import { CATEGORIES } from './data/mockData';
import { EntrepreneurPortal } from './components/EntrepreneurPortal';

export default function App() {
  const [portalOpen, setPortalOpen] = useState(() => window.location.hash === '#portal');
  const [modalState, setModalState] = useState<ModalType>({
    isOpen: false,
    type: null,
    data: null,
  });

  const handleOpenModal = (type: ModalType['type'], data?: any) => {
    setModalState({
      isOpen: true,
      type,
      data,
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      data: null,
    });
  };

  const handleSelectCategory = (category: CategoryItem | string) => {
    if (typeof category === 'string') {
      const found = CATEGORIES.find((c) => c.id === category);
      if (found) {
        handleOpenModal('category_detail', found);
      } else {
        handleOpenModal('marketplace');
      }
    } else {
      handleOpenModal('category_detail', category);
    }
  };

  const openPortal = () => {
    window.location.hash = 'portal';
    setPortalOpen(true);
  };

  const closePortal = () => {
    history.replaceState(null, '', window.location.pathname);
    setPortalOpen(false);
  };

  if (portalOpen) return <EntrepreneurPortal onExit={closePortal} />;

  return (
    <div className="min-h-screen bg-[#fdfaf6] text-[#1a1a1a] flex flex-col font-sans selection:bg-[#8a1f3d] selection:text-white">
      {/* Top Header */}
      <Header
        onOpenModal={(type) => handleOpenModal(type)}
        onSelectCategory={(catId) => handleSelectCategory(catId)}
        onOpenPortal={openPortal}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExplore={() => handleOpenModal('marketplace')}
          onOpenCategory={(cat) => handleSelectCategory(cat)}
        />

        {/* Press / Trust Bar */}
        <TrustBar />

        {/* Shop By Need Categories Grid */}
        <ShopByNeed onSelectCategory={(cat) => handleSelectCategory(cat)} />

        {/* Dark Luxury Value Proposition Banner */}
        <ValueProposition />

        {/* 5 Digital Enablement Pillars */}
        <EnablementPillars />

        {/* Ground Impact Section (ODOP UP) */}
        <GroundImpact />

        {/* Two Roles Movement (The Builder vs The Backer) */}
        <TwoRolesMovement
          onOpenBuilderModal={() => handleOpenModal('builder')}
          onOpenMarketplaceModal={() => handleOpenModal('marketplace')}
        />

        {/* Impact Engine Visualization */}
        <ImpactEngine />

        {/* Service Hub Section */}
        <ServiceHub onCreateSpace={() => handleOpenModal('service_space')} />

        {/* Final Join Movement Banner */}
        <FinalBanner
          onJoinSeller={() => handleOpenModal('builder')}
          onBecomeMentor={() => handleOpenModal('mentor')}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenModal={(type) => handleOpenModal(type)}
        onSelectCategory={(catId) => handleSelectCategory(catId)}
      />

      {/* Interactive Modals & Drawers */}
      <Modals modalState={modalState} onClose={handleCloseModal} />
    </div>
  );
}
