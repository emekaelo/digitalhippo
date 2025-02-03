"use client"

import {useEffect, useRef, useState} from "react";
import {PRODUCT_CATEGORIES} from "@/src/config";
import {NavItem} from "@/src/components/NavItem";
import {useOnClickOutside} from "@/src/hooks/use-on-click-outside";

export const NavItems = () => {
    const [activeIndex, setActiveIndex] = useState<null | number>(null);
    const isAnyOpen = activeIndex !== null;
    const navRef = useRef<HTMLDivElement>(null!)
    useOnClickOutside(navRef, () => setActiveIndex(null))

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActiveIndex(null)
            }
        }

        document.addEventListener('keydown', handler)

        return () => {
            document.removeEventListener('keydown', handler)
        }
    }, []);

    return (
        <div className='flex gap-4 h-full' ref={navRef}>
            {PRODUCT_CATEGORIES.map((category, i) => {
                const handleOpen = () => {
                    if(activeIndex === i) {
                        setActiveIndex(null)
                    } else {
                        setActiveIndex(i)
                    }
                }

                const isOpen = i === activeIndex;
                return <NavItem category={category} handleOpen={handleOpen} isOpen={isOpen} key={category.value} isAnyOpen={isAnyOpen} />
            })}
        </div>
    );
};
