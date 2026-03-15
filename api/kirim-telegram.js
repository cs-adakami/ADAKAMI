
module.exports = async function handler(req, res) {

    // Pastikan cuma nerima metode POST dari HTML kamu
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Hanya menerima method POST' });
    }

    // Tangkap isi pesan yang dikirim dari script HTML
    const pesanDariHtml = req.body.pesan;

    // Ini dia tempat token kamu dipanggil secara rahasia sayang
    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    // Alamat asli Telegramnya dipindah ke sini
    const urlTelegram = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        // Proses ngirim pesan ke Telegram
        const respon = await fetch(urlTelegram, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: pesanDariHtml,
                parse_mode: 'HTML'
            })
        });

        const hasil = await respon.json();
        
        // Kasih tahu HTML kalau pesan sukses dikirim
        res.status(200).json({ sukses: true, data: hasil });
    } catch (error) {
        // Kasih tahu HTML kalau ada yang error
        res.status(500).json({ sukses: false, error: 'Gagal kirim pesan ke Telegram' });
    }
}
