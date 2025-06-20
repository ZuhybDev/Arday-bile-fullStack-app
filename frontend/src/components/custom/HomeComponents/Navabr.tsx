"use client";

import React, { useEffect, useState } from "react";

const sections = ["home", "features", "analytics", "About"];

const Navabr = () => {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (enteris) => {
        enteris.forEach((entery) => {
          if (entery.isIntersecting) {
            setActive(entery.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={
            active == id ? "underline antialiased font-semibold font-san" : ""
          }
        >
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </a>
      ))}
    </div>
  );
};

export default Navabr;
