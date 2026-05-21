import {
    ArrowLeftIcon,
    CheckFatIcon,
    EyeClosedIcon,
    EyeIcon,
    FacebookLogoIcon,
    GoogleLogoIcon,
} from '@phosphor-icons/react';
import React from 'react';
import ButtonPrimer from '../components/ButtonPrimer';

export default function Auth() {
    const [mode, setMode] = React.useState<'login' | 'register'>('login');
    const [eye, setEye] = React.useState(false);
    const isRegister = mode === 'register';

    return (
        <div className="h-screen bg-background text-on-surface font-body-md selection:bg-primary selection:text-on-primary overflow-x-hidden">
            <main className="flex flex-col md:flex-row">
                {/* <!-- Left Side: Brand Impact --> */}
                <section className="relative w-full md:w-1/2 min-h-102 md:min-h-screen flex items-center justify-center overflow-hidden bg-surface-container-lowest">
                    {/* <!-- Background Image with Texture Overlay --> */}
                    <div className="absolute inset-0 z-0">
                        <img
                            className="w-full h-full object-cover opacity-60 grayscale-[0.3]"
                            data-alt="A macro cinematic shot of premium crinkle-cut potato chips with a deep golden hue and visible seasoning specks. The scene is lit with dramatic, high-contrast warm lighting that emphasizes the crunchy ridges and textures against a dark, sophisticated charcoal background. The atmosphere is bold and indulgent, capturing the essence of a high-end snack experience with deep shadows and vibrant energy."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNQF6nyZbzaebio5ep2sN_ti1qBEM2Nj-PmxmguAReSQfpQR7Hy0yN5dlmAdp1bnp_JaGNgzkbI4uO093gjnPuESn_yrRnDDOmep5VaHJa9IPdR4uQ5U-SrYM-bSVxqkM9jcTaMJ6uJ7MAEmuXc36MyngJVLKZjYVMcvREmiZCZ-8K3NfouttYrI-y3e2aITkUM8PBVwxbf80K0LXeiywOFV3tJqloqNQ-YY7bYTlWNg7O5_dqXsThgLcPUcUGiVPcJ6byMR_6lx0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
                        <div className="absolute inset-0 bg-chitato-texture opacity-20"></div>
                    </div>
                    {/* <!-- Brand Message Overlay --> */}
                    <div className="relative z-10 md:text-left max-w-xl">
                        <h1 className="font-display-xl text-9xl font-bold text-primary-fixed italic uppercase tracking-tight animate-bounce">
                            CHITATO
                        </h1>
                        <p className="font-headline-md text-headline-md text-secondary-fixed leading-none uppercase mb-1 tracking-widest">
                            LIFE IS NEVER FLAT.
                        </p>
                        <div className="hidden md:block w-56 h-2 bg-primary kick-shadow-yellow"></div>
                    </div>
                    {/* <!-- Wave Decorative Divider (Mobile Only) --> */}
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-background md:hidden wave-mask"></div>
                </section>

                {/* <!-- Right Side: Form Container --> */}
                <section className="w-full md:w-1/2 min-h-[614px] md:min-h-screen flex items-center justify-center p-margin-mobile md:p-gutter bg-background">
                    <div className="w-full max-w-md">
                        {/* <!-- Back Home Link --> */}
                        <a
                            className="inline-flex items-center gap-2 mb-12 text-on-surface-variant hover:text-primary transition-colors group"
                            href="#"
                        >
                            <ArrowLeftIcon size={24} />
                            <span className="font-label-bold text-xl uppercase">Back to Home</span>
                        </a>
                        {/* <!-- Form Card --> */}
                        <div className="space-y-8">
                            <header>
                                <h2
                                    className="font-headline-lg text-headline-lg text-on-surface"
                                    id="form-title"
                                >
                                    {isRegister ? 'Ayo Daftar!' : 'Selamat Datang Kembali!'}
                                </h2>
                                <p className="text-on-surface-variant font-body-md">
                                    Nikmati kelezatan Chitato favoritmu sekarang.
                                </p>
                            </header>
                            {/* <!-- Auth Toggle --> */}
                            <div className="flex p-1 bg-surface-container-high rounded-lg gap-1 border border-white/5">
                                <button
                                    className={`flex-1 py-1 font-label-bold text-xl uppercase rounded ${!isRegister ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'} transition-all`}
                                    id="btn-login-toggle"
                                    onClick={() => setMode('login')}
                                >
                                    Login
                                </button>
                                <button
                                    className={`flex-1 py-1 font-label-bold text-xl uppercase rounded ${isRegister ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'} transition-all`}
                                    id="btn-register-toggle"
                                    onClick={() => setMode('register')}
                                >
                                    Register
                                </button>
                            </div>
                            {/* <!-- The Form --> */}
                            <form className="space-y-6" id="auth-form">
                                {/* <!-- Email/Username --> */}
                                <div className="space-y-2">
                                    <label
                                        className="block font-label-bold text-lg font-light tracking-wider uppercase text-on-surface-variant"
                                        // for="identity"
                                    >
                                        Email or Username
                                    </label>
                                    <input
                                        className="w-full bg-surface-container-low border-2 border-surface-variant rounded-lg px-4 py-2 text-on-surface placeholder:text-surface-container-highest focus:outline-none focus:border-secondary-fixed focus:ring-1 focus:ring-secondary-fixed transition-all"
                                        id="identity"
                                        placeholder="yourname@domain.com"
                                        type="text"
                                    />
                                </div>
                                {/* <!-- Password --> */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label
                                            className="block font-label-bold text-lg font-light tracking-wider uppercase text-on-surface-variant"
                                            // for="password"
                                        >
                                            Password
                                        </label>
                                        <a
                                            className="text-[10px] font-extralight tracking-widest uppercase text-primary hover:text-secondary-fixed transition-colors"
                                            href="#"
                                            id="forgot-pass"
                                        >
                                            Forgot ?
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <input
                                            className="w-full bg-surface-container-low border-2 border-surface-variant rounded-lg px-4 py-2 text-on-surface placeholder:text-surface-container-highest focus:outline-none focus:border-secondary-fixed focus:ring-1 focus:ring-secondary-fixed transition-all"
                                            id="password"
                                            placeholder="••••••••"
                                            type={eye ? 'text' : 'password'}
                                        />
                                        <button
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                                            type="button"
                                            onClick={() => setEye(!eye)}
                                        >
                                            {/* <EyeIcon size={20} /> */}
                                            {eye ? (
                                                <EyeIcon size={20} />
                                            ) : (
                                                <EyeClosedIcon size={20} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                {isRegister && (
                                    <div className="space-y-6" id="register-fields">
                                        <div className="space-y-2">
                                            <label
                                                className="block font-label-bold text-xl uppercase text-on-surface-variant"
                                                // for="confirm-password"
                                            >
                                                Confirm Password
                                            </label>
                                            <input
                                                className="w-full bg-surface-container-low border-2 border-surface-variant rounded-lg px-4 py-2 text-on-surface placeholder:text-surface-container-highest focus:outline-none focus:border-secondary-fixed focus:ring-1 focus:ring-secondary-fixed transition-all"
                                                id="confirm-password"
                                                placeholder="••••••••"
                                                type={eye ? 'text' : 'password'}
                                            />
                                        </div>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="peer hidden" />

                                            <div className="rounded-sm w-5 h-5 border-2 border-surface-variant bg-surface-container-low flex items-start justify-center transition-all duration-200 peer-checked:bg-primary-container peer-checked:[&>svg]:opacity-100 peer-checked:[&>svg]:scale-100 group-hover:scale-105">
                                                <CheckFatIcon
                                                    size={14}
                                                    weight="fill"
                                                    className=" text-secondary-fixed opacity-0 scale-50 transition-all duration-200"
                                                />
                                            </div>

                                            <span className="text-sm text-on-surface-variant leading-snug">
                                                I agree to the{' '}
                                                <a
                                                    className="text-primary hover:underline"
                                                    href="#"
                                                >
                                                    Terms of Service
                                                </a>{' '}
                                                and{' '}
                                                <a
                                                    className="text-primary hover:underline"
                                                    href="#"
                                                >
                                                    Privacy Policy
                                                </a>
                                                .
                                            </span>
                                        </label>
                                    </div>
                                )}

                                {/* <!-- Submit Button --> */}
                                <ButtonPrimer
                                    text={isRegister ? 'DAFTAR' : 'LOGIN'}
                                    mainColor="bg-primary-container"
                                    extraClasses="w-full justify-center active:bg-primary-container py-2"
                                    showIcon={false}
                                ></ButtonPrimer>
                            </form>
                            {/* <!-- Social Login --> */}
                            <div className="space-y-4">
                                <div className="relative flex items-center py-4">
                                    <div className="grow border-t border-surface-variant"></div>
                                    <span className="shrink mx-4 font-extralight text-[10px] text-on-surface-variant uppercase tracking-widest">
                                        Or Continue With
                                    </span>
                                    <div className="grow border-t border-surface-variant"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center gap-2 py-3 border-2 border-surface-variant rounded-lg hover:border-on-surface transition-all text-on-surface">
                                        <GoogleLogoIcon size={24} weight='bold'/>
                                        <span className="font-label-bold text-lg font-light tracking-wider uppercase">
                                            Google
                                        </span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 py-3 border-2 border-surface-variant rounded-lg hover:border-on-surface transition-all text-on-surface">
                                        <FacebookLogoIcon size={24}/>
                                        <span className="font-label-bold text-lg font-light tracking-wider uppercase">
                                            Facebook
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
