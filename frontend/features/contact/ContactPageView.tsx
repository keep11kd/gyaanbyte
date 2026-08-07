import React from 'react';
import { Contact } from './sections';

export const ContactPageView: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-white antialiased text-slate-900 selection:bg-slate-900 selection:text-white">
      <Contact />
    </main>
  );
};

export default ContactPageView;
