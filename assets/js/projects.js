window.PROJECTS = [
    {
        id: 'digicem-icecream',
        title: { id: 'Digifem Ice Cream', en: 'Digifem Ice Cream' },
        desc: {
            id: 'Aplikasi kerja merchandiser Unilever Ice Cream untuk visit terverifikasi, absensi, dan eksekusi toko end-to-end. Semua aktivitas dibuktikan foto, didukung survey fleksibel, dashboard achievement, QR scanner, biometric login, dan tetap stabil dengan offline-first flow.',
            en: 'Field app for Unilever Ice Cream merchandisers to run geo-verified visits, attendance, and end-to-end store execution. Photo proof, flexible surveys, achievement dashboards, QR scanner, biometric login, and a cutting-edge offline-first flow keep it fast and reliable.'
        },
        chips: ['CV', 'Edge'],
        homeChips: ['300+ Users', '2024 ongoing', 'Unilever'],
        stack: ['Android (Kotlin)', 'TFLite', 'RTSP', 'MQTT'],
        features: [
            {
                icon: 'location_on',
                title: { id:'Visit terverifikasi', en:'Geo-verified visits' },
                desc: { id:'Geotag + selfie memastikan kunjungan di toko dan absensi harian.', en:'Geotag plus selfie proof ensures in-store visits and daily attendance.' }
            },
            {
                icon: 'photo_camera',
                title: { id:'Bukti rak, promo, kompetitor', en:'Shelf, promo, competitor proof' },
                desc: { id:'Foto eksekusi di lapangan untuk audit cepat dan akurat.', en:'Capture execution photos for fast, accurate audits.' }
            },
            {
                icon: 'fact_check',
                title: { id:'Listing, POSM, cabinet', en:'Listing, POSM, cabinet compliance' },
                desc: { id:'Pantau listing produk, POSM, dan cabinet terpasang per toko.', en:'Track product listing, POSM, and cabinet installation per store.' }
            },
            {
                icon: 'tune',
                title: { id:'Survey super fleksibel', en:'Flexible survey engine' },
                desc: { id:'Free text, dropdown, multi-select, foto, price range, hingga kalender.', en:'Free text, dropdown, multi-select, photo, price range, and calendar.' }
            },
            {
                icon: 'cloud_off',
                title: { id:'Offline-first stabil', en:'Offline-first reliability' },
                desc: { id:'Data ditarik saat login dan dashboard, kerja tetap jalan tanpa sinyal.', en:'Data pulled at login and dashboard keeps work running with no signal.' }
            },
            {
                icon: 'insights',
                title: { id:'Dashboard achievement', en:'Achievement dashboard' },
                desc: { id:'Progress harian dan bulanan terlihat jelas untuk motivasi tim.', en:'Daily and monthly progress stays visible to keep teams motivated.' }
            },
            {
                icon: 'qr_code_scanner',
                title: { id:'QR + biometric', en:'QR + biometric tools' },
                desc: { id:'QR scanner dan biometric login bikin proses makin cepat dan aman.', en:'QR scanner and biometric login speed up and secure the flow.' }
            }
        ],
        metrics: [
            { label:'Latency', value:'~80â€“120 ms' },
            { label:'Devices', value:'300+ cameras' }
        ],
        client: 'MAP Active',
        period: '2024 â€” ongoing',
        role: 'Solution Architect â€¢ CV Engineer',
        heroImage: 'assets/img/icecream/Splash.png',
        heroGhostImage: 'assets/img/icecream/Store List.png',
        gallery: [
            'assets/img/icecream/Splash.png',
            'assets/img/icecream/Store List.png',
            'assets/img/icecream/Homepage.png',
            'assets/img/icecream/Homepage Resync.png',
            'assets/img/icecream/Login.png',
            'assets/img/icecream/Login Pull Data.png',
            'assets/img/icecream/Main Menu.png',
            'assets/img/icecream/Store List Mini Dashboard.png',
            'assets/img/icecream/Store Detail.png',
            'assets/img/icecream/Store Detail No Visit.png',
            'assets/img/icecream/Cabinet List.png',
            'assets/img/icecream/Product List.png',
            'assets/img/icecream/Product Detail.png',
            'assets/img/icecream/Target Product.png',
            'assets/img/icecream/Barcode Manual.png',
            'assets/img/icecream/Scan QR.png',
            'assets/img/icecream/Image Recognition.png',
            'assets/img/icecream/Absent.png',
            'assets/img/icecream/Guideline.png',
            'assets/img/icecream/Information.png',
            'assets/img/icecream/Information Detail.png',
            'assets/img/icecream/Information Detail 2.png',
            'assets/img/icecream/Trans History.png',
            'assets/img/icecream/Trans History Detail.png'
        ],
        image: 'assets/img/icecream/Splash.png',
        links: {
            demo: '#',
            video: 'https://youtu.be/xxxx',
            case: '#'
        }
    },
    {
        id: 'merchandiser-app',
        title: { id:'Merchandiser App', en:'Merchandiser App' },
        desc: {
            id:'Sistem Merchandise offline-first (sinkronisasi besar, ribuan user).',
            en:'Offline-first merchandising with massive sync for thousands of users.'
        },
        chips: ['Android', 'Offline-first'],
        stack: ['Android (Kotlin/Java)', 'Room/GreenDAO', 'WorkManager', 'JWT'],
        features: [
            {
                icon: 'sync',
                title: { id:'Sinkronisasi besar', en:'Bulk sync' },
                desc: { id:'Saat login', en:'On login' }
            },
            {
                icon: 'assignment',
                title: { id:'Order dan audit', en:'Orders and audits' },
                desc: { id:'Termasuk foto bukti', en:'Includes photo proofs' }
            },
            {
                icon: 'accessibility_new',
                title: { id:'Material3 UI', en:'Material3 UI' },
                desc: { id:'Plus aksesibilitas', en:'Plus accessibility' }
            }
        ],
        metrics: [
            { label:'Users', value:'8K+' },
            { label:'Audit Accuracy', value:'High' },
            { label:'Manual Tracking', value:'Digitalized' }
        ],
        client: 'Pitjarus',
        period: '2021 â€” ongoing',
        role: 'Lead Android Dev',
        gallery: [
            'assets/img/placeholder.png',
            'assets/img/placeholder.png'
        ],
        image: 'assets/img/placeholder.png',
        links: { case:'#' }
    },
    {
        id: 'forecast-dashboard',
        title: { id:'Forecast Dashboard', en:'Forecast Dashboard' },
        desc: {
            id:'Dashboard forecasting interaktif untuk keputusan berbasis data.',
            en:'Interactive forecasting dashboard for data-driven decisions.'
        },
        chips: ['Analytics', 'Timeseries'],
        stack: ['Node.js', 'ClickHouse', 'Highcharts'],
        features: [
            {
                icon: 'query_stats',
                title: { id:'Skenario promosi', en:'Promotion what-if' },
                desc: { id:'Tes skenario promosi', en:'Test promotion scenarios' }
            },
            {
                icon: 'warning',
                title: { id:'Deteksi anomali', en:'Anomaly detection' },
                desc: { id:'Alert anomali otomatis', en:'Automated anomaly alerts' }
            },
            {
                icon: 'file_download',
                title: { id:'Export PDF/CSV', en:'Export PDF/CSV' },
                desc: { id:'Unduh laporan cepat', en:'Quick report downloads' }
            }
        ],
        metrics: [
            { label:'SKU', value:'1.2K+' },
            { label:'Latency', value:'sub-second charting' }
        ],
        client: 'FMCG Brand',
        period: '2024',
        role: 'Fullstack Engineer',
        gallery: ['assets/img/placeholder.png','assets/img/placeholder.png'],
        image: 'assets/img/placeholder.png',
        links: { }
    },
    {
        id: 'SFA Apps',
        title: { id:'SFA Apps', en:'SFA Apps' },
        desc: {
            id:'Dashboard forecasting interaktif untuk keputusan berbasis data.',
            en:'Interactive forecasting dashboard for data-driven decisions.'
        },
        chips: ['Analytics', 'Timeseries'],
        stack: ['Node.js', 'ClickHouse', 'Highcharts'],
        features: [
            {
                icon: 'query_stats',
                title: { id:'Skenario promosi', en:'Promotion what-if' },
                desc: { id:'Tes skenario promosi', en:'Test promotion scenarios' }
            },
            {
                icon: 'warning',
                title: { id:'Deteksi anomali', en:'Anomaly detection' },
                desc: { id:'Alert anomali otomatis', en:'Automated anomaly alerts' }
            },
            {
                icon: 'file_download',
                title: { id:'Export PDF/CSV', en:'Export PDF/CSV' },
                desc: { id:'Unduh laporan cepat', en:'Quick report downloads' }
            }
        ],
        metrics: [
            { label:'SKU', value:'1.2K+' },
            { label:'Latency', value:'sub-second charting' }
        ],
        client: 'FMCG Brand',
        period: '2024',
        role: 'Fullstack Engineer',
        gallery: ['assets/img/placeholder.png','assets/img/placeholder.png'],
        image: 'assets/img/placeholder.png',
        links: { }
    }
];
