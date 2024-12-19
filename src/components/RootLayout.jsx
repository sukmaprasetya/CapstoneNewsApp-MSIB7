import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import Footer from './Footer';

function RootLayout() {
  return (
    <div 
      style={{
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        paddingBottom: '160px'
      }}
    >
      <Navbar />
      
      <main style={{ 
        flex: 1,  
        marginBottom: '20px' 
      }}>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}

export default RootLayout;