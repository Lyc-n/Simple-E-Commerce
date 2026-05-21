import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { loadSnapScript, createTransaction } from '../services/midtrans';
import { ArrowRightIcon, BankIcon, CheckCircleIcon, LockIcon, MoneyIcon, MopedIcon, SpinnerGapIcon, TruckIcon, WalletIcon } from '@phosphor-icons/react';

type CourierType = 'jne' | 'sicepat' | 'gosend';
type PaymentType = 'gopay' | 'va';

export default function Checkout() {
    const subtotal = 55500;

    const [courier, setCourier] = useState<CourierType>('jne');
    const [payment, setPayment] = useState<PaymentType>('gopay');
    const [shippingCost, setShippingCost] = useState<number>(12000);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [showReceipt, setShowReceipt] = useState<boolean>(false);

    const [paymentStatus, setPaymentStatus] = useState<'success' | 'pending' | 'error' | null>(
        null
    );
    const [orderId, setOrderId] = useState<string>('');

    // Efek perubahan kurir untuk memperbarui ongkir
    useEffect(() => {
        if (courier === 'jne') setShippingCost(12000);
        if (courier === 'sicepat') setShippingCost(9000);
        if (courier === 'gosend') setShippingCost(25000);
    }, [courier]);

    // Simulasi Proses Pembayaran
    const handleProcessPayment = async () => {
        try {
            setIsProcessing(true);
            setShowReceipt(false);
            setPaymentStatus(null);

            const data = await createTransaction(courier, payment);

            await loadSnapScript();

            setOrderId(data.order_id);
            setIsProcessing(false);

            if (!window.snap) {
                throw new Error('Snap belum siap');
            }

            window.snap.pay(data.token, {
                onSuccess: () => {
                    setPaymentStatus('success');
                    setShowReceipt(true);
                },
                onPending: () => {
                    setPaymentStatus('pending');
                    setShowReceipt(true);
                },
                onError: () => {
                    setPaymentStatus('error');
                    setShowReceipt(true);
                },
                onClose: () => {
                    setIsProcessing(false);
                },
            });
        } catch (error) {
            console.error(error);
            setIsProcessing(false);
            alert('Gagal membuat transaksi Midtrans');
        }
    };

    return (
        <div className="bg-background text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container min-h-screen">
            <Navbar />

            <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-section-gap">
                    {/* Left Column */}
                    <div className="lg:col-span-7 space-y-gutter">
                        <h1 className="text-4xl font-semibold font-headline-lg text-primary uppercase tracking-wide mb-base">
                            Final Checkout
                        </h1>

                        {/* Shipping Section */}
                        <section className="bg-surface-container-low p-gutter border border-white/5 rounded-lg">
                            <div className="flex items-center gap-base mb-gutter">
                                <TruckIcon size={28} className='text-secondary-container'/>
                                <h2 className="text-3xl font-headline-md text-on-surface">
                                    Shipping Address
                                </h2>
                            </div>
                            <form
                                className="grid grid-cols-1 md:grid-cols-2 gap-base"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <div className="md:col-span-2">
                                    <label className="block text-lg tracking-wider font-label-bold uppercase text-on-surface-variant mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        className="w-full bg-surface-container-highest border-2 border-white/20 py-2 px-4 focus:border-secondary-fixed focus:ring-0 text-on-surface rounded transition-all"
                                        placeholder="Enter recipient name"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg tracking-wider font-label-bold uppercase text-on-surface-variant mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        className="w-full bg-surface-container-highest border-2 border-white/20 py-2 px-4 focus:border-secondary-fixed focus:ring-0 text-on-surface rounded transition-all"
                                        placeholder="+62 812..."
                                        type="tel"
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg tracking-wider font-label-bold uppercase text-on-surface-variant mb-2">
                                        Postal Code
                                    </label>
                                    <input
                                        className="w-full bg-surface-container-highest border-2 border-white/20 py-2 px-4 focus:border-secondary-fixed focus:ring-0 text-on-surface rounded transition-all"
                                        placeholder="12345"
                                        type="text"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-lg tracking-wider font-label-bold uppercase text-on-surface-variant mb-2">
                                        Detailed Address
                                    </label>
                                    <textarea
                                        className="w-full bg-surface-container-highest border-2 border-white/20 py-2 px-4 focus:border-secondary-fixed focus:ring-0 text-on-surface rounded transition-all"
                                        placeholder="Building, Street, Unit number..."
                                        rows={3}
                                    ></textarea>
                                </div>
                            </form>
                        </section>

                        {/* Courier Selector */}
                        <section className="bg-surface-container-low p-gutter border border-white/5 rounded-lg">
                            <div className="flex items-center gap-base mb-gutter">
                                <MopedIcon size={28} className='text-secondary-container' />
                                <h2 className="text-3xl font-headline-md text-on-surface">
                                    Delivery Method
                                </h2>
                            </div>
                            <div className="space-y-base">
                                {/* JNE */}
                                <label
                                    className={`flex items-center justify-between p-4 bg-surface-container-highest border-2 hover:border-primary cursor-pointer transition-all rounded group ${courier === 'jne' ? 'border-primary bg-primary-container/20' : 'border-transparent'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <input
                                            className="hidden"
                                            name="courier"
                                            type="radio"
                                            value="jne"
                                            checked={courier === 'jne'}
                                            onChange={() => setCourier('jne')}
                                        />
                                        <div className="w-12 h-12 bg-white rounded flex items-center justify-center p-2">
                                            <img
                                                className="w-full object-contain"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuByJnUHJhCc_6vne-CGYcT4IDtZei1IH279PsrUVVSlTYrjUNrvstmAWnURN4URASVKiKO_JjRrT7J7RL22v4c_KYrpbzfybmiu_Muh9t_CEoZ1b2KC8DKEtMD-bfwGowJqh3UxI3SsFb3QPzEELj92E1m4y7OlFEYRfxTTcSX3tVXwp8aNN4hxdc5RloM4MT2wqd3AVKxR76PqomcJHbnGpoU1zybldiIcEqBDVByyF8S5Q9FK1qNzIk6Vy-maS4BgD2fxSoUQu-k"
                                                alt="JNE Logo"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold uppercase tracking-wide">
                                                JNE Reguler
                                            </p>
                                            <p className="text-sm text-on-surface-variant">
                                                2-3 Working Days
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-secondary-fixed">
                                        Rp 12.000
                                    </span>
                                </label>

                                {/* SICEPAT */}
                                <label
                                    className={`flex items-center justify-between p-4 bg-surface-container-highest border-2 hover:border-primary cursor-pointer transition-all rounded group ${courier === 'sicepat' ? 'border-primary bg-primary-container/20' : 'border-transparent'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <input
                                            className="hidden"
                                            name="courier"
                                            type="radio"
                                            value="sicepat"
                                            checked={courier === 'sicepat'}
                                            onChange={() => setCourier('sicepat')}
                                        />
                                        <div className="w-12 h-12 bg-white rounded flex items-center justify-center p-2">
                                            <img
                                                className="w-full object-contain"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcWYcWavsdZwofoBV5cBfrdiwXoxBDo_35HRw7OQNATpJdzIDTCYMDf5MsAM7a88bH7QEd9HxscBGpUcNaN2JM-mevEe-ckeg-pL4opAo7a-eo6W3gEwaIEFeyXghA3RxHrvtb_wyJNJAqhp91ZuMAonwvRjYgU8nco_3kgvJXRXUGcTv4DTtfy0_NhN4-ELoDusFK1FtQk6U1dwgAYRtOV96QpfDLRD4lyRiJDuveErSZ_zRP5I9R9YDULsn1_nG2sc73zC5RH8o"
                                                alt="SiCepat Logo"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold uppercase tracking-wide">
                                                SiCepat HALU
                                            </p>
                                            <p className="text-sm text-on-surface-variant">
                                                3-5 Working Days
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-secondary-fixed">Rp 9.000</span>
                                </label>

                                {/* GOSEND */}
                                <label
                                    className={`flex items-center justify-between p-4 bg-surface-container-highest border-2 hover:border-primary cursor-pointer transition-all rounded group ${courier === 'gosend' ? 'border-primary bg-primary-container/20' : 'border-transparent'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <input
                                            className="hidden"
                                            name="courier"
                                            type="radio"
                                            value="gosend"
                                            checked={courier === 'gosend'}
                                            onChange={() => setCourier('gosend')}
                                        />
                                        <div className="w-12 h-12 bg-white rounded flex items-center justify-center p-2">
                                            <img
                                                className="w-full object-contain"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdpRKAedDFmLCCToVKJMLVZVVkj_2vOaTPI4V6e7cyVy9utY_lNY8vhjgeu3DdPCz2MQ2qRv90qTD-8kDlpPMAxkA_u2ogTfOY6KG_OGUGdhsTOtdWwIlmSaX9d8wRX-R2ss6Yg_ymt4ZrvYgNP0JROJOcGcYIEo4cOnny6j8rlW0xf0ISEdBFK_8h9aSZhVu-IjeeiVQSUsyIs6a5BDFOw9RfP4Oj5NXckPjt8Fth5UBAPkgq9MhW5lQ80kzgT6ccg27ksVC1_HU"
                                                alt="GoSend Logo"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold uppercase tracking-wide">
                                                GoSend Instant
                                            </p>
                                            <p className="text-sm text-on-surface-variant">
                                                Within 3 Hours
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-secondary-fixed">
                                        Rp 25.000
                                    </span>
                                </label>
                            </div>
                        </section>

                        {/* Payment Section */}
                        <section className="bg-surface-container-low p-gutter border border-white/5 rounded-lg">
                            <div className="flex items-center gap-base mb-gutter">
                                <MoneyIcon size={28} className='text-secondary-container' />
                                <h2 className="text-3xl font-headline-md text-on-surface">
                                    Payment Method
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-base">
                                {/* GOPAY */}
                                <label
                                    className={`relative p-4 bg-surface-container-highest border-2 cursor-pointer transition-all rounded group kick-shadow-gold ${payment === 'gopay' ? 'border-secondary-fixed bg-secondary-fixed/5' : 'border-transparent hover:border-secondary-fixed'}`}
                                >
                                    <input
                                        className="hidden"
                                        name="payment"
                                        type="radio"
                                        value="gopay"
                                        checked={payment === 'gopay'}
                                        onChange={() => setPayment('gopay')}
                                    />
                                    <div className="flex flex-col">
                                        <WalletIcon size={32} className='text-primary mb-3' />
                                        <p className="tracking-wide leading-5 font-label-bold uppercase">
                                            GoPay / E-Wallet
                                        </p>
                                        <p className="text-xs text-on-surface-variant">
                                            Instant Confirmation
                                        </p>
                                    </div>
                                </label>

                                {/* VIRTUAL ACCOUNT */}
                                <label
                                    className={`relative p-4 bg-surface-container-highest border-2 cursor-pointer transition-all rounded group ${payment === 'va' ? 'border-secondary-fixed bg-secondary-fixed/5' : 'border-transparent hover:border-secondary-fixed'}`}
                                >
                                    <input
                                        className="hidden"
                                        name="payment"
                                        type="radio"
                                        value="va"
                                        checked={payment === 'va'}
                                        onChange={() => setPayment('va')}
                                    />
                                    <div className="flex flex-col">
                                        <BankIcon size={32} className='text-primary mb-3' />
                                        <p className="tracking-wide leading-5 font-label-bold uppercase">
                                            Virtual Account
                                        </p>
                                        <p className="text-xs text-on-surface-variant">
                                            BCA, Mandiri, BNI
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-28 space-y-gutter">
                            <div className="bg-surface-container-highest border-4 border-primary p-gutter kick-shadow-primary relative overflow-hidden">
                                <h3 className="text-4xl font-semibold font-headline-lg text-secondary uppercase tracking-wide mb-4 border-b-2 border-b-primary/30 pb-4">
                                    Order Summary
                                </h3>

                                <div className="space-y-4 mb-section-gap">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-surface rounded p-1 border border-white/10">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRT_xqwDOtRuFQfdtgDCVBVp_V-ZruudJ3e1mkJ6vaz_1I4zbiUjIbYBh8HRb2QL_6XP_tl4aVTDp-sIIQd32L8Q6ZcWmxPt0q1GSANDEw9EmB1JhUtMP9SE0idFP__o7-OUFHvuCXOI0EE5o-Vbyzu3T8v5gRG0FapupdtDymTLsJhaje80uJILgilXAe5dZRmX_bPWectVcLXWDPA4B-yRER2xWLg-hahZiu3KoP-EvqX7u75QaIjL21QxznlMlp48yscV1gVAI"
                                                    alt="Chitato Beef BBQ"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-bold">Chitato Beef BBQ (x3)</p>
                                                <p className="text-sm text-on-surface-variant">
                                                    Large 120g
                                                </p>
                                            </div>
                                        </div>
                                        <span className="font-bold">Rp 45.000</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-surface rounded p-1 border border-white/10">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWbjUf3wVFawX3G3y97REO2fJjGcD7KqmqYXCTOmb4VZo5ZYR5btLreUOPgDG_e0ugvvwMs4CmPYklr6DwE0xeFJNOXwpqxdLjOSHx3R8DHK9pUjCXvA1kX0JM_ltSQtN9zqDluXU1_97wGT7KhIgMDOgIaz7OW_B8JZdGGYL8lwUWjdfKCnVyBLoIpCT4_UdtZ4fkA7Se68uZQeQhn3UHxZboUxJPGLJskRwowayEe8jt9YFLpiOGqvLW9rr_xSIBkhLSy9bfif0"
                                                    alt="Chitato Lite Sea Salt"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-bold">
                                                    Chitato Lite Sea Salt (x1)
                                                </p>
                                                <p className="text-sm text-on-surface-variant">
                                                    Regular 68g
                                                </p>
                                            </div>
                                        </div>
                                        <span className="font-bold">Rp 10.500</span>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-gutter border-t-2 border-dashed border-primary/30">
                                    <div className="flex justify-between text-on-surface-variant">
                                        <span>Subtotal</span>
                                        <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-on-surface-variant">
                                        <span>Shipping Cost</span>
                                        <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-headline-md font-headline-md text-secondary-fixed mt-4">
                                        <span>TOTAL</span>
                                        <span>
                                            Rp {(subtotal + shippingCost).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className="w-full rounded mt-gutter font-semibold text-xl bg-primary-container text-white py-2 font-headline-md uppercase tracking-widest hover:scale-103 active:scale-95 transition-all kick-shadow-gold group flex items-center justify-center gap-2"
                                    onClick={handleProcessPayment}
                                    disabled={isProcessing}
                                >
                                    <span>Pay Now</span>
                                    <ArrowRightIcon size={24} weight='bold' className='group-hover:translate-x-1 transition-transform pb-1' />
                                </button>
                                <p className="text-center text-xs text-on-surface-variant mt-4 flex items-center justify-center gap-1">
                                    <LockIcon size={16} />
                                    Secure encrypted transaction
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Processing Overlay */}
            {isProcessing && (
                <div className="fixed inset-0 z-60 bg-surface/95 flex items-center justify-center">
                    <div className="text-center">
                        <div className="relative w-32 h-32 mx-auto mb-gutter">
                            <div className="absolute inset-0 border-4 border-primary rounded-full animate-ping opacity-20"></div>
                            <div className="absolute inset-4 border-4 border-secondary-fixed rounded-full processing-pulse"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <SpinnerGapIcon size={64} className='animate-spin' />
                            </div>
                        </div>
                        <h2 className="text-headline-md font-headline-md text-white uppercase tracking-widest">
                            Menyiapkan pembayaran...
                        </h2>
                        <p className="text-on-surface-variant mt-2 font-body-md">
                            Mohon tunggu sebentar.
                        </p>
                    </div>
                </div>
            )}

            {/* Digital Receipt Modal */}
            {showReceipt && (
                <div className="fixed inset-0 z-70 bg-black/80 flex items-center justify-center p-margin-mobile">
                    <div className="bg-surface-container border-2 border-secondary-fixed max-w-md w-full p-gutter rounded-lg relative kick-shadow-gold">
                        <div className="absolute -top-6 -right-6 bg-secondary-fixed text-on-secondary-fixed px-6 py-2 font-black italic text-headline-md rotate-12 shadow-xl border-2 border-on-secondary-fixed">
                            LUNAS
                        </div>

                        <div className="text-center mb-gutter">
                            <CheckCircleIcon size={124} className='text-green-500 mx-auto mb-4' weight='fill'/>
                            <h3 className="text-headline-md font-headline-md uppercase">
                                {paymentStatus === 'pending'
                                    ? 'Pembayaran Pending'
                                    : paymentStatus === 'error'
                                      ? 'Pembayaran Gagal'
                                      : 'Terima Kasih!'}
                            </h3>
                            <p className="text-on-surface-variant">
                                {paymentStatus === 'pending'
                                    ? `Pesanan ${orderId} menunggu konfirmasi pembayaran.`
                                    : paymentStatus === 'error'
                                      ? 'Terjadi kendala saat memproses pembayaran.'
                                      : `Pesanan ${orderId} berhasil dibuat`}
                            </p>
                        </div>

                        <div className="border-y-2 border-dashed border-white/10 py-gutter my-gutter space-y-base font-mono text-sm uppercase">
                            <div className="flex justify-between">
                                <span>Metode</span>
                                <span className="capitalize">
                                    {payment === 'gopay' ? 'GoPay' : 'Virtual Account'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Pengiriman</span>
                                <span className="capitalize">
                                    {courier === 'jne'
                                        ? 'JNE Reguler'
                                        : courier === 'sicepat'
                                          ? 'SiCepat HALU'
                                          : 'GoSend Instant'}
                                </span>
                            </div>
                            <div className="pt-base border-t border-white/5 flex justify-between font-bold text-lg text-secondary-fixed">
                                <span>Total Bayar</span>
                                <span>Rp {(subtotal + shippingCost).toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        <div className="space-y-base">
                            <button
                                className="w-full bg-secondary border rounded border-white/20 text-inverse-on-surface py-2 font-label-bold uppercase tracking-widest text-md font-semibold hover:border-primary-container hover:bg-secondary/80 hover:text-surface-container-highest active:scale-97 transition-colors"
                                onClick={() => setShowReceipt(false)}
                            >
                                Kembali ke Beranda
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
