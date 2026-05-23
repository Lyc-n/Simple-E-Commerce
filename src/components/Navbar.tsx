import { ShoppingCartIcon, UserCircleIcon } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function Navbar() {
    const { user } = useAuth();
    return (
        <div className="bg-surface/80 backdrop-blur-md dark:bg-surface/80 docked full-width top-0 sticky z-50 shadow-md border-b border-white/10 h-15">
            <nav className="flex justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto h-full">
                <NavLink to={'/'}>
                    <div className="group text-4xl mt-1.5 font-headline-md font-black italic text-primary tracking-normal cursor-default">
                        CHITATO
                    </div>
                </NavLink>
                <div className="md:flex items-center gap-8">
                    <NavLink
                        className={({ isActive }) =>
                            `hover:text-primary transition-all duration-150 font-semibold text-label-bold hover:scale-105 ${isActive ? 'text-primary scale-105 border-b-2 border-primary' : 'text-on-surface'}`
                        }
                        to="/shop"
                    >
                        Shop
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `hover:text-primary transition-all duration-150 font-semibold text-label-bold hover:scale-105 ${isActive ? 'text-primary scale-105 border-b-2 border-primary' : 'text-on-surface'}`
                        }
                        to="/flavors"
                    >
                        Flavors
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `hover:text-primary transition-all duration-150 font-semibold text-label-bold hover:scale-105 ${isActive ? 'text-primary scale-105 border-b-2 border-primary' : 'text-on-surface'}`
                        }
                        to="/story"
                    >
                        Story
                    </NavLink>
                </div>
                <div className="flex items-center gap-4">
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            `inline-block cursor-pointer transition-all duration-150 hover:text-primary active:scale-95 ${
                                isActive ? 'text-primary' : 'text-on-surface'
                            }`
                        }
                    >
                        <ShoppingCartIcon size={24} />
                    </NavLink>
                    {user ? (
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `inline-block cursor-pointer transition-all duration-150 hover:text-primary active:scale-95 ${
                                    isActive ? 'text-primary' : 'text-on-surface'
                                }`
                            }
                        >
                            <UserCircleIcon size={24} />
                        </NavLink>
                    ) : (
                        <NavLink
                            to="/authentication"
                            className={({ isActive }) =>
                                `font-semibold text-xs uppercase tracking-wider transition-all duration-150 bg-primary-container px-4 py-2 hover:brightness-110 rounded hover:text-white active:scale-97 ${
                                    isActive ? 'text-primary' : 'text-on-surface'
                                }`
                            }
                        >
                            masuk
                        </NavLink>
                    )}
                </div>
            </nav>
        </div>
    );
}
