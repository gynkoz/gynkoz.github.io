window.PROJECTS = [
    {
        id: 'digicem-icecream',
        title: { id: 'Digifem Ice Cream App', en: 'Digifem Ice Cream App' },
        desc: {
            id: 'Aplikasi kerja merchandiser Unilever Ice Cream untuk visit terverifikasi, absensi, dan eksekusi toko end-to-end. Semua aktivitas dibuktikan foto, didukung survey fleksibel, dashboard achievement, QR scanner, biometric login, dan tetap stabil dengan offline-first flow.',
            en: 'Field app for Unilever Ice Cream merchandisers to run geo-verified visits, attendance, and end-to-end store execution. Photo proof, flexible surveys, achievement dashboards, QR scanner, biometric login, and a cutting-edge offline-first flow keep it fast and reliable.'
        },
        chips: ['CV', 'Edge'],
        homeChips: ['4000+ Users', '2024 ongoing', 'Unilever'],
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
        client: 'Unilever',
        period: '2021 ongoing',
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
        id: 'bmxresponse',
        title: { id:'BMX Response App', en:'BMX Response App' },
        desc: {
            id:'Dashboard untuk Head Office dan team leader dengan ringkasan skor toko, chat langsung dengan merchandiser, peta coverage intuitif, dan approval izin sekali klik.',
            en:'Executive dashboard for Head Office and team leaders with a clean store score overview, direct field chat, intuitive coverage maps, and one-tap leave approvals.'
        },
        homeChips: ['300+ Users', '2022 ongoing', 'Sari Roti'],
        stack: ['Android (Kotlin/Java)', 'Room/GreenDAO', 'WorkManager', 'JWT'],
        features: [
            {
                icon: 'leaderboard',
                title: { id:'Ringkasan skor toko', en:'Store score overview' },
                desc: { id:'Skor semua toko dirangkum ringkas untuk pantau performa cepat.', en:'Minimal scorecards keep every store performance visible at a glance.' }
            },
            {
                icon: 'chat',
                title: { id:'Chat langsung ke lapangan', en:'Direct field chat' },
                desc: { id:'HO bisa follow-up merchandiser tanpa pindah kanal.', en:'Follow up with merchandisers instantly without switching tools.' }
            },
            {
                icon: 'map',
                title: { id:'Peta coverage toko', en:'Coverage map' },
                desc: { id:'Toko sekitar yang di-cover terlihat jelas di peta.', en:'Intuitive maps show nearby stores in your coverage.' }
            },
            {
                icon: 'check_circle',
                title: { id:'Approval izin cepat', en:'Fast leave approvals' },
                desc: { id:'Permintaan izin bawahan langsung disetujui di dashboard.', en:'Approve leave requests in the same dashboard flow.' }
            }
        ],
        metrics: [
            { label:'Users', value:'8K+' },
            { label:'Audit Accuracy', value:'High' },
            { label:'Manual Tracking', value:'Digitalized' }
        ],
        client: 'Pitjarus',
        period: '2021 ongoing',
        role: 'Lead Android Dev',
        heroImage: 'assets/img/bmxresponse/Login.jpg',
        heroGhostImage: 'assets/img/bmxresponse/Dashboard.jpg',
        gallery: [
            'assets/img/bmxresponse/Login.jpg',
            'assets/img/bmxresponse/Home menu.jpg',
            'assets/img/bmxresponse/Dashboard.jpg',
            'assets/img/bmxresponse/Dashboard Performance.jpg',
            'assets/img/bmxresponse/DashBoard Detail.jpg',
            'assets/img/bmxresponse/Store List.jpg',
            'assets/img/bmxresponse/Store Detail.jpg',
            'assets/img/bmxresponse/Store Detail Dashboard.jpg',
            'assets/img/bmxresponse/Store Detail Dashboard Score.jpg',
            'assets/img/bmxresponse/Store Detail Menu.jpg',
            'assets/img/bmxresponse/Store Detail Gallery.jpg',
            'assets/img/bmxresponse/Feedback List.jpg',
            'assets/img/bmxresponse/Feedback Detail.jpg',
            'assets/img/bmxresponse/Feedback Reply.jpg',
            'assets/img/bmxresponse/Add new Feedback.jpg',
            'assets/img/bmxresponse/Approval List.jpg'
        ],
        image: 'assets/img/bmxresponse/Dashboard.jpg',
        links: { case:'#' }
    },
    {
        id: 'dmsdistributor',
        title: { id:'Distributor Apps', en:'Distributor Apps' },
        desc: {
            id:'Aplikasi distributor untuk tracking barang ke toko berbasis journey plan, dengan absensi, validasi toko via geotag + selfie, e-sign dan cetak nota, dashboard tagihan/kunjungan, serta flow dropping, invoice, retur, NOO, mutasi, settlement, dan inventory. Offline-first aman tanpa internet.',
            en:'Distributor app to track stock to stores on a journey plan with attendance, geo + selfie validation, e-sign and receipt printing, billing/visit dashboards, and complete drop-invoice-return plus stock operations. Offline-first when the network is down.'
        },
        homeChips: ['800+ Users', '2020 ongoing', 'Sari Roti'],
        chips: ['Android', 'Logistics', 'Offline-first'],
        stack: ['Android', 'Offline Sync', 'Geo Validation', 'E-Sign'],
        features: [
            {
                icon: 'location_on',
                title: { id:'Absensi + validasi toko', en:'Attendance + store validation' },
                desc: { id:'Geotag dan selfie memastikan kunjungan valid.', en:'Geotag plus selfie ensures valid store visits.' }
            },
            {
                icon: 'tune',
                title: { id:'Kuestioner fleksibel', en:'Flexible questionnaires' },
                desc: { id:'Atur dropdown, free text, calendar, foto, dan radio button.', en:'Customize dropdowns, free text, calendar, photo, and radio buttons.' }
            },
            {
                icon: 'local_shipping',
                title: { id:'Dropping, invoice, retur', en:'Drop, invoice, return' },
                desc: { id:'Alur distribusi lengkap dari drop barang sampai retur.', en:'Full distribution flow from drops to in-store invoices and returns.' }
            },
            {
                icon: 'receipt_long',
                title: { id:'Nota + e-sign', en:'Receipt + e-sign' },
                desc: { id:'Cetak nota dan e-sign sebagai bukti serah terima.', en:'Print receipts and capture e-signatures for handover proof.' }
            },
            {
                icon: 'inventory_2',
                title: { id:'Operasi stok', en:'Stock operations' },
                desc: { id:'Mutasi, settlement, dan inventory list dalam satu tampilan.', en:'Handle stock mutation, settlement, and personal inventory in one view.' }
            },
            {
                icon: 'dashboard',
                title: { id:'Dashboard tagihan & kunjungan', en:'Billing and visit dashboard' },
                desc: { id:'Pantau tagihan aktif dan total kunjungan harian.', en:'Track active bills and daily visit totals at a glance.' }
            },
            {
                icon: 'sync',
                title: { id:'Offline-first aman', en:'Offline-first reliability' },
                desc: { id:'Tetap jalan walau koneksi tidak stabil.', en:'Keeps working safely without a stable connection.' }
            }
        ],
        metrics: [
            { label:'Mode', value:'Offline-first' },
            { label:'Coverage', value:'Journey plan' },
            { label:'Flow', value:'Drop - invoice - return' }
        ],
        client: 'FMCG Brand',
        period: '2024',
        role: 'Fullstack Engineer',
        heroImage: 'assets/img/dmsdistributor/Home Page.jpg',
        heroGhostImage: 'assets/img/dmsdistributor/Store list.jpg',
        gallery: [
            'assets/img/dmsdistributor/Login.jpg',
            'assets/img/dmsdistributor/Home Page.jpg',
            'assets/img/dmsdistributor/Main Menu.jpg',
            'assets/img/dmsdistributor/Store list.jpg',
            'assets/img/dmsdistributor/Store Detail.jpg',
            'assets/img/dmsdistributor/Store No Visit.jpg',
            'assets/img/dmsdistributor/Absensi.jpg',
            'assets/img/dmsdistributor/Kuestioner.jpg',
            'assets/img/dmsdistributor/Kuestioner Detail.jpg',
            'assets/img/dmsdistributor/Inventory Stok.jpg',
            'assets/img/dmsdistributor/Ambil Stok.jpg',
            'assets/img/dmsdistributor/Create Dropping.jpg',
            'assets/img/dmsdistributor/Dropping add.jpg',
            'assets/img/dmsdistributor/Dropping add detail.jpg',
            'assets/img/dmsdistributor/Dropping Submit.jpg',
            'assets/img/dmsdistributor/Tagihan List.jpg',
            'assets/img/dmsdistributor/Tagihan List Add.jpg',
            'assets/img/dmsdistributor/Tagihan Detail.jpg',
            'assets/img/dmsdistributor/Tagihan Detail Submit.jpg',
            'assets/img/dmsdistributor/Mutasi List.jpg',
            'assets/img/dmsdistributor/Mutasi Detail.jpg',
            'assets/img/dmsdistributor/Settlement Detail.jpg',
            'assets/img/dmsdistributor/Estimasi Order.jpg',
            'assets/img/dmsdistributor/Menu lain.jpg'
        ],
        image: 'assets/img/dmsdistributor/Home Page.jpg',
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
