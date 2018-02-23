import React from 'react';
import FontAwesome from 'react-fontawesome';

export const truncateText = (text, amount) => (
  text.length >= amount 
  ? (text.slice(0, amount) + '...')
  : text
);


export const renderIcon = (icon, className = `icon__${icon}`, size = null, spin = false) => (
  <FontAwesome
    className={className}
    name={icon}
    size={size}
    spin={false}
  />
);