import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function loadSnapScript(): Promise<void> {
    return new Promise((resolve, reject) => {
        // Sudah pernah diload
        if (window.snap) {
            resolve();
            return;
        }

        // Cegah double script
        const existingScript = document.getElementById(
            'midtrans-snap-script'
        ) as HTMLScriptElement | null;

        if (existingScript) {
            existingScript.addEventListener('load', () => resolve(), { once: true });

            existingScript.addEventListener(
                'error',
                () => reject(new Error('Gagal memuat Snap.js')),
                { once: true }
            );

            return;
        }

        const script = document.createElement('script');

        script.id = 'midtrans-snap-script';
        script.type = 'text/javascript';
        script.async = true;

        script.src =
            import.meta.env.VITE_MIDTRANS_IS_PROD === 'true'
                ? 'https://app.midtrans.com/snap/snap.js'
                : 'https://app.sandbox.midtrans.com/snap/snap.js';

        script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY);

        script.onload = () => resolve();

        script.onerror = () => reject(new Error('Gagal memuat Snap.js'));

        document.body.appendChild(script);
    });
}

export async function createTransaction(courier: string, payment: string) {
    const response = await axios.post(`${API_BASE_URL}/api/midtrans/create-transaction`, {
        courier,
        payment,
    });

    return response.data;
}
