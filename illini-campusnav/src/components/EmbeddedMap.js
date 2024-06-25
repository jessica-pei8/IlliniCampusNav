import React from 'react';

const EmbeddedMap = () => {
  return (
    <div className="relative w-full h-96">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6102.968781313809!2d-88.23258530470743!3d40.10920743596229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880cd73e24e1bc29%3A0x7f2e29a1ada98912!2sMain%20Quad!5e0!3m2!1sen!2sus!4v1709262217542!5m2!1sen!2sus" 
        width="100%" 
        height="450" 
        style={{ border: '0', filter: 'invert(0.8) grayscale(1) contrast(1)' }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default EmbeddedMap;
