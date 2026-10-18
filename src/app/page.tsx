'use client';

import { useEffect, useState } from "react";
import "./flower.scss";

export default function AwFlowerPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flower-container ${isLoaded ? "" : "not-loaded"}`}>
      {/* flower content */}
      <div className="absolute top-8 left-8 z-50">
        <div className="relative flex items-center justify-center drop-shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-24 h-24">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] text-xl font-normal select-none text-[#7b3f20] font-[family-name:var(--font-aesthetic)] drop-shadow-[0_1px_2px_rgba(123,63,32,0.45)] z-10">A&amp;W</span>
        </div>
      </div>
    <div className="night"></div>
    <div className="flowers">
      <div className="flower flower--1">
        <div className="flower__leafs flower__leafs--1">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--3"></div>
          <div className="flower__leaf flower__leaf--4"></div>
          <div className="flower__white-circle"></div>
  
          <div className="flower__light flower__light--1"></div>
          <div className="flower__light flower__light--2"></div>
          <div className="flower__light flower__light--3"></div>
          <div className="flower__light flower__light--4"></div>
          <div className="flower__light flower__light--5"></div>
          <div className="flower__light flower__light--6"></div>
          <div className="flower__light flower__light--7"></div>
          <div className="flower__light flower__light--8"></div>
  
        </div>
        <div className="flower__line">
          <div className="flower__line__leaf flower__line__leaf--1"></div>
          <div className="flower__line__leaf flower__line__leaf--2"></div>
          <div className="flower__line__leaf flower__line__leaf--3"></div>
          <div className="flower__line__leaf flower__line__leaf--4"></div>
          <div className="flower__line__leaf flower__line__leaf--5"></div>
          <div className="flower__line__leaf flower__line__leaf--6"></div>
        </div>
      </div>
  
      <div className="flower flower--2">
        <div className="flower__leafs flower__leafs--2">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--3"></div>
          <div className="flower__leaf flower__leaf--4"></div>
          <div className="flower__white-circle"></div>
  
          <div className="flower__light flower__light--1"></div>
          <div className="flower__light flower__light--2"></div>
          <div className="flower__light flower__light--3"></div>
          <div className="flower__light flower__light--4"></div>
          <div className="flower__light flower__light--5"></div>
          <div className="flower__light flower__light--6"></div>
          <div className="flower__light flower__light--7"></div>
          <div className="flower__light flower__light--8"></div>
  
        </div>
        <div className="flower__line">
          <div className="flower__line__leaf flower__line__leaf--1"></div>
          <div className="flower__line__leaf flower__line__leaf--2"></div>
          <div className="flower__line__leaf flower__line__leaf--3"></div>
          <div className="flower__line__leaf flower__line__leaf--4"></div>
        </div>
      </div>
  
      <div className="flower flower--3">
        <div className="flower__leafs flower__leafs--3">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--3"></div>
          <div className="flower__leaf flower__leaf--4"></div>
          <div className="flower__white-circle"></div>
  
          <div className="flower__light flower__light--1"></div>
          <div className="flower__light flower__light--2"></div>
          <div className="flower__light flower__light--3"></div>
          <div className="flower__light flower__light--4"></div>
          <div className="flower__light flower__light--5"></div>
          <div className="flower__light flower__light--6"></div>
          <div className="flower__light flower__light--7"></div>
          <div className="flower__light flower__light--8"></div>
  
        </div>
        <div className="flower__line">
          <div className="flower__line__leaf flower__line__leaf--1"></div>
          <div className="flower__line__leaf flower__line__leaf--2"></div>
          <div className="flower__line__leaf flower__line__leaf--3"></div>
          <div className="flower__line__leaf flower__line__leaf--4"></div>
        </div>
      </div>
  
      <div className="grow-ans" style={{ "--d": "1.2s" } as React.CSSProperties}>
        <div className="flower__g-long">
          <div className="flower__g-long__top"></div>
          <div className="flower__g-long__bottom"></div>
        </div>
      </div>
  
      <div className="growing-grass">
        <div className="flower__grass flower__grass--1">
          <div className="flower__grass--top"></div>
          <div className="flower__grass--bottom"></div>
          <div className="flower__grass__leaf flower__grass__leaf--1"></div>
          <div className="flower__grass__leaf flower__grass__leaf--2"></div>
          <div className="flower__grass__leaf flower__grass__leaf--3"></div>
          <div className="flower__grass__leaf flower__grass__leaf--4"></div>
          <div className="flower__grass__leaf flower__grass__leaf--5"></div>
          <div className="flower__grass__leaf flower__grass__leaf--6"></div>
          <div className="flower__grass__leaf flower__grass__leaf--7"></div>
          <div className="flower__grass__leaf flower__grass__leaf--8"></div>
          <div className="flower__grass__overlay"></div>
        </div>
      </div>
  
      <div className="growing-grass">
        <div className="flower__grass flower__grass--2">
          <div className="flower__grass--top"></div>
          <div className="flower__grass--bottom"></div>
          <div className="flower__grass__leaf flower__grass__leaf--1"></div>
          <div className="flower__grass__leaf flower__grass__leaf--2"></div>
          <div className="flower__grass__leaf flower__grass__leaf--3"></div>
          <div className="flower__grass__leaf flower__grass__leaf--4"></div>
          <div className="flower__grass__leaf flower__grass__leaf--5"></div>
          <div className="flower__grass__leaf flower__grass__leaf--6"></div>
          <div className="flower__grass__leaf flower__grass__leaf--7"></div>
          <div className="flower__grass__leaf flower__grass__leaf--8"></div>
          <div className="flower__grass__overlay"></div>
        </div>
      </div>
  
      <div className="grow-ans" style={{ "--d": "2.4s" } as React.CSSProperties}>
        <div className="flower__g-right flower__g-right--1">
          <div className="leaf"></div>
        </div>
      </div>
  
      <div className="grow-ans" style={{ "--d": "2.8s" } as React.CSSProperties}>
        <div className="flower__g-right flower__g-right--2">
          <div className="leaf"></div>
        </div>
      </div>
  
      <div className="grow-ans" style={{ "--d": "2.8s" } as React.CSSProperties}>
        <div className="flower__g-front">
          <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--1">
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--2">
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--3">
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--4">
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--5">
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--6">
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--7">
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--8">
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__line"></div>
        </div>
      </div>
  
      <div className="grow-ans" style={{ "--d": "3.2s" } as React.CSSProperties}>
        <div className="flower__g-fr">
          <div className="leaf"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--1"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--2"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--3"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--4"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--5"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--6"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--7"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--8"></div>
        </div>
      </div>
  
      <div className="long-g long-g--0">
        <div className="grow-ans" style={{ "--d": "3s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "2.2s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.4s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.6s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>
  
      <div className="long-g long-g--1">
        <div className="grow-ans" style={{ "--d": "3.6s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.8s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.2s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>
  
      <div className="long-g long-g--2">
        <div className="grow-ans" style={{ "--d": "4s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.2s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.4s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.6s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>
  
      <div className="long-g long-g--3">
        <div className="grow-ans" style={{ "--d": "4s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.2s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.6s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>
  
      <div className="long-g long-g--4">
        <div className="grow-ans" style={{ "--d": "4s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.2s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.6s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>
  
      <div className="long-g long-g--5">
        <div className="grow-ans" style={{ "--d": "4s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.2s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.6s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>
  
      <div className="long-g long-g--6">
        <div className="grow-ans" style={{ "--d": "4.2s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.4s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.6s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.8s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>
  
      <div className="long-g long-g--7">
        <div className="grow-ans" style={{ "--d": "3s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.2s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.5s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.6s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>
    </div>

    </div>
  );
}
