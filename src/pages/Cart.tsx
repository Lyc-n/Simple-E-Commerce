import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../lib/api';

import {
    TrashIcon,
    PlusIcon,
    MinusIcon,
    ArrowRightIcon,
    XIcon,
} from '@phosphor-icons/react';

type CartItem = {
    id: string;
    productName: string;
    imageUrl: string;
    flavor: string;
    size: string;
    price: number;
    quantity: number;
    subtotal: number;
};

export default function Cart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await api.get(`/api/cart`);
                setCart(res.data.items);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchCart();
    }, []);

    // update qty
    function updateQty(id: string, quantity: number) {
        if (quantity < 1) return;

        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );

        api.patch(`/api/cart/${id}`, { quantity }).catch(console.error);
    }

    // remove item
    function removeItem(id: string) {
        setCart((prev) => prev.filter((item) => item.id !== id));

        api.delete(`/api/cart/${id}`).catch(console.error);
    }

    // subtotal (client-safe fallback)
    const subtotal = useMemo(() => {
        return cart.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
    }, [cart]);

    return (
        <div className="bg-background text-on-surface font-body-md min-h-screen">
            <Navbar />

            <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap">

                {/* HEADER */}
                <section className="mb-10">
                    <h1 className="text-headline-lg font-headline-lg text-white uppercase mb-2">
                        Your Cart
                    </h1>
                    <p className="text-on-surface-variant">
                        Review your items before checkout
                    </p>
                </section>

                {/* CONTENT */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-section-gap">

                    {/* LEFT */}
                    <div className="lg:col-span-8 space-y-4">

                        {loading ? (
                            <p className="text-on-surface-variant">
                                Loading cart...
                            </p>
                        ) : cart.length === 0 ? (
                            <div className="bg-surface-container-low p-gutter rounded-lg border border-white/5">
                                <p className="text-on-surface-variant">
                                    Your cart is empty.
                                </p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between bg-surface-container-low p-gutter rounded-lg border border-white/5"
                                >

                                    {/* PRODUCT */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.imageUrl}
                                            className="w-16 h-16 object-cover rounded border border-white/10"
                                        />

                                        <div>
                                            <h3 className="font-bold text-white">
                                                {item.productName}
                                            </h3>

                                            <p className="text-sm text-on-surface-variant">
                                                {item.flavor} • {item.size}
                                            </p>

                                            <p className="text-secondary-fixed font-bold">
                                                Rp {item.price.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        {/* QTY */}
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() =>
                                                    updateQty(item.id, item.quantity - 1)
                                                }
                                                className="p-2 bg-surface-container-high rounded hover:bg-primary transition"
                                            >
                                                <MinusIcon size={16} />
                                            </button>

                                            <span className="w-6 text-center">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    updateQty(item.id, item.quantity + 1)
                                                }
                                                className="p-2 bg-surface-container-high rounded hover:bg-primary transition"
                                            >
                                                <PlusIcon size={16} />
                                            </button>
                                        </div>

                                        {/* DELETE */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="ml-4 text-red-400 hover:text-red-300"
                                        >
                                            <TrashIcon size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* RIGHT */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 bg-surface-container-highest p-gutter rounded-lg border border-primary">

                            <h2 className="text-headline-md font-headline-md text-white mb-4 uppercase">
                                Summary
                            </h2>

                            <div className="space-y-2 text-on-surface-variant">

                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>
                                        Rp {subtotal.toLocaleString('id-ID')}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>

                                {cart.map((order)=>(
                                    <div className="flex justify-between mt-2 pt-3 border-t border-white/10 border-dashed">
                                        <div className="flex flex-col gap-0.5">
                                            <p className='text-xs text-primary'>
                                                {order.productName}
                                            </p>
                                            <div className="flex items-center gap-0.5">
                                                <p className='text-xs'>
                                                    {order.quantity}
                                                </p>
                                                <XIcon size={12} />
                                            </div>
                                        </div>
                                        <p className="text-xs text-primary">
                                            Rp {''}
                                            {(order.price * order.quantity).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                ))}

                                <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-white">
                                    <span>Total</span>
                                    <span>
                                        Rp {subtotal.toLocaleString('id-ID')}
                                    </span>
                                </div>

                            </div>

                            <button
                                disabled={cart.length === 0}
                                className="w-full mt-6 bg-primary-container text-white py-3 rounded font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-102 active:scale-98 transition disabled:opacity-40"
                                onClick={() => (window.location.href = '/checkout')}
                            >
                                Checkout
                                <ArrowRightIcon size={18} />
                            </button>

                        </div>
                    </div>

                </section>
            </main>

            <Footer />
        </div>
    );
}