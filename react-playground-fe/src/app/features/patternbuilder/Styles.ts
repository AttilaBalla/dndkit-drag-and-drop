import React from 'react';

const styles: { [style: string]: React.CSSProperties } = {
  grid: {
    display: "grid",
    gap: '.75rem',
  },
  cardStyles: {
    width: "4rem",
    height: "4rem",
    position: "relative",
    background: "white",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.15)",
    borderRadius: 10,
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    userSelect: "none",
    touchAction: "none"
  }
};

export default styles;
