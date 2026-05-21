import { ShoppingCartIcon } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';

export default function ButtonSec() {
    return (
        <NavLink to={'/checkout'}>
            <button className="bg-primary-container flex items-center text-white px-4 gap-2 py-1 font-label-bold text-xl tracking-widest rounded-sm chip-shadow-var active:bg-inverse-primary chip-hover-var transition-all active:scale-95">
                BELI <ShoppingCartIcon weight="bold" />
            </button>
        </NavLink>
    );
}
