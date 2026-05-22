import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/authContext';
import { getMe } from '../services/authService';

export default function Profile() {
    const { logout } = useAuth();

    // State untuk menyimpan data profil
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        bio: '',
    });

    // State untuk mengatur mode edit
    const [isEditing, setIsEditing] = useState(false);

    // Handler untuk mendeteksi perubahan input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handler untuk tombol Simpan / Edit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsEditing(!isEditing);
    };


    // Fetch data profil saat komponen pertama kali dimuat
useEffect(() => {
    async function fetchProfile() {
        try {
            const data = await getMe();

            setProfileData({
                fullName: data.user.name || '',
                email: data.user.email || '',
                phone: data.user.number || '',
                address: data.user.address || '',
                bio: data.user.bio || '',
            });
        } catch (error) {
            console.error(error);
        }
    }

    fetchProfile();
}, []);

    return (
        <div className="min-h-screen bg-[#121414] text-[#e2e2e2] font-sans antialiased flex flex-col">
            <Navbar />

            {/* MAIN CONTAINER */}
            <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* LEFT SIDE: AVATAR CARD */}
                    <div className="block">
                        <div className="md:col-span-1 bg-surface-container-low border-2 border-[#333535] p-6 rounded-lg flex flex-col items-center text-center h-fit shadow-[6px_6px_0px_0px_#b20d0d]">
                            <div className="relative w-24 h-24 mb-4 rounded-full border-4 border-[#ffe16d] overflow-hidden bg-surface-container-highest flex items-center justify-center">
                                <span className="text-4xl font-bold text-secondary-fixed uppercase">
                                    {profileData.fullName.charAt(0)}
                                </span>
                            </div>
                            <h3 className="font-bold text-xl tracking-wide uppercase text-[#e2e2e2]">
                                {profileData.fullName || 'User Baru'}
                            </h3>
                            <p className="text-xs text-[#e5bdb8] uppercase tracking-widest mt-1">
                                Chitato Member
                            </p>
                            <div className="w-12 h-1 bg-[#b20d0d] mt-4 shadow-[2px_2px_0px_0px_#ffe16d]"></div>
                        </div>
                        <button
                            className="mt-4 w-full py-2 text-md tracking-[0.2em] font-black uppercase rounded transition-all active:scale-98 shadow-[4px_4px_0px_0px_#ffe16d] hover:-translate-y-0.5 bg-surface-container-highest text-[#e2e2e2] hover:bg-surface-bright"
                            onClick={logout}
                        >
                            <p>LOGOUT</p>
                        </button>
                    </div>

                    {/* RIGHT SIDE: PROFILE FORM */}
                    <div className="md:col-span-2 bg-surface-container-low border-2 border-[#333535] p-6 md:p-8 rounded-lg shadow-[6px_6px_0px_0px_#b20d0d]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#e2e2e2]">
                                Profil Saya
                            </h2>
                            <p className="text-xs text-[#e5bdb8] italic">
                                {isEditing ? 'Mode Mengubah' : 'Mode Melihat'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Nama Lengkap */}
                            <div className="space-y-1">
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#e5bdb8]">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    disabled={!isEditing}
                                    value={profileData.fullName}
                                    onChange={handleChange}
                                    placeholder="Isi nama lengkap Anda"
                                    className="w-full bg-[#121414] border-2 border-[#333535] disabled:opacity-60 rounded-lg px-4 py-3 text-[#e2e2e2] focus:outline-none focus:border-[#ffe16d] transition-all"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#e5bdb8]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    disabled={!isEditing}
                                    value={profileData.email}
                                    onChange={handleChange}
                                    placeholder="nama@domain.com"
                                    className="w-full bg-[#121414] border-2 border-[#333535] disabled:opacity-60 rounded-lg px-4 py-3 text-[#e2e2e2] focus:outline-none focus:border-[#ffe16d] transition-all"
                                />
                            </div>

                            {/* Nomor Telepon (Opsional) */}
                            <div className="space-y-1">
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#e5bdb8]">
                                    Nomor Telepon{' '}
                                    <span className="text-xs text-secondary-fixed font-normal lowercase">
                                        (opsional)
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    disabled={!isEditing}
                                    value={profileData.phone}
                                    onChange={handleChange}
                                    placeholder="Contoh: 0812xxxxx"
                                    className="w-full bg-[#121414] border-2 border-[#333535] disabled:opacity-60 rounded-lg px-4 py-3 text-[#e2e2e2] focus:outline-none focus:border-[#ffe16d] transition-all"
                                />
                            </div>

                            {/* Alamat (Opsional) */}
                            <div className="space-y-1">
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#e5bdb8]">
                                    Alamat Rumah{' '}
                                    <span className="text-xs text-secondary-fixed font-normal lowercase">
                                        (opsional)
                                    </span>
                                </label>
                                <textarea
                                    name="address"
                                    disabled={!isEditing}
                                    rows={2}
                                    value={profileData.address}
                                    onChange={handleChange}
                                    placeholder="Tulis alamat lengkap pengiriman keripik"
                                    className="w-full bg-[#121414] border-2 border-[#333535] disabled:opacity-60 rounded-lg px-4 py-3 text-[#e2e2e2] focus:outline-none focus:border-[#ffe16d] transition-all resize-none"
                                />
                            </div>

                            {/* Bio Singkat (Opsional) */}
                            <div className="space-y-1">
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#e5bdb8]">
                                    Bio{' '}
                                    <span className="text-xs text-secondary-fixed font-normal lowercase">
                                        (opsional)
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="bio"
                                    disabled={!isEditing}
                                    value={profileData.bio}
                                    onChange={handleChange}
                                    placeholder="Ceritakan sedikit tentang dirimu"
                                    className="w-full bg-[#121414] border-2 border-[#333535] disabled:opacity-60 rounded-lg px-4 py-3 text-[#e2e2e2] focus:outline-none focus:border-[#ffe16d] transition-all"
                                />
                            </div>

                            {/* SUBMIT BUTTON */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className={`w-full py-4 text-md tracking-[0.2em] font-black uppercase rounded transition-all active:scale-98 shadow-[4px_4px_0px_0px_#ffe16d] hover:-translate-y-0.5
                    ${
                        isEditing
                            ? 'bg-[#b20d0d] text-[#fff9ef] hover:bg-[#c91212]'
                            : 'bg-surface-container-highest text-[#e2e2e2] hover:bg-surface-bright'
                    }`}
                                >
                                    {isEditing ? 'Simpan Perubahan' : 'Ubah Profil'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}
