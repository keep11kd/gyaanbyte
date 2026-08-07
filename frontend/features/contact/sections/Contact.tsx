// features/contact/sections/Contact.tsx

import React from 'react';
import { ContactHeader } from './ContactHeader';
import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';
import { ContactMap } from './ContactMap';
import { ContactCTA } from './ContactCTA';

export const Contact: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-slate-900 selection:text-white">
      <ContactHeader />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
      <ContactCTA />
    </div>
  );
};
