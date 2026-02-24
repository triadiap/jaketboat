<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Checkout</title>

    {{-- Midtrans Snap JS --}}
    <script src="{{ $js_endpoint }}"
            data-client-key="{{ $client_key }}"></script>

    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>

    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
            --bg: #0d0d0d;
            --surface: #161616;
            --border: #2a2a2a;
            --accent: #c8f542;
            --accent-dim: rgba(200, 245, 66, 0.12);
            --text: #f0f0f0;
            --muted: #6b6b6b;
            --danger: #ff4d4d;
            --success: #4dff91;
        }

        body {
            background: var(--bg);
            color: var(--text);
            font-family: 'DM Sans', sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            background-image:
                radial-gradient(ellipse 60% 50% at 70% 20%, rgba(200,245,66,0.05) 0%, transparent 60%),
                radial-gradient(ellipse 40% 40% at 20% 80%, rgba(200,245,66,0.03) 0%, transparent 60%);
        }

        .checkout-wrapper {
            width: 100%;
            max-width: 960px;
            display: grid;
            grid-template-columns: 1fr 420px;
            gap: 2px;
            background: var(--border);
            border: 1px solid var(--border);
            border-radius: 20px;
            overflow: hidden;
            animation: fadeUp 0.6s ease both;
        }

        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        /* ── LEFT PANEL ── */
        .panel-left {
            background: var(--surface);
            padding: 3rem;
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .brand-mark {
            width: 36px; height: 36px;
            background: var(--accent);
            border-radius: 8px;
            display: grid; place-items: center;
        }

        .brand-mark svg { width: 18px; height: 18px; }

        .brand-name {
            font-family: 'Syne', sans-serif;
            font-weight: 800;
            font-size: 1.1rem;
            letter-spacing: -0.02em;
            color: var(--text);
        }

        .section-label {
            font-size: 0.7rem;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--muted);
            margin-bottom: 1rem;
        }

        /* Order Items */
        .order-items { display: flex; flex-direction: column; gap: 0.75rem; }

        .order-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: 12px;
            transition: border-color 0.2s;
        }

        .order-item:hover { border-color: #3a3a3a; }

        .item-thumb {
            width: 52px; height: 52px;
            border-radius: 8px;
            background: var(--accent-dim);
            border: 1px solid rgba(200,245,66,0.2);
            display: grid; place-items: center;
            flex-shrink: 0;
            font-size: 1.4rem;
        }

        .item-info { flex: 1; }

        .item-name {
            font-family: 'Syne', sans-serif;
            font-weight: 600;
            font-size: 0.9rem;
            color: var(--text);
        }

        .item-desc {
            font-size: 0.8rem;
            color: var(--muted);
            margin-top: 2px;
        }

        .item-price {
            font-family: 'Syne', sans-serif;
            font-weight: 700;
            font-size: 0.95rem;
            color: var(--accent);
        }

        /* Summary */
        .summary { border-top: 1px solid var(--border); padding-top: 1.5rem; }

        .summary-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.45rem 0;
            font-size: 0.875rem;
        }

        .summary-row .label { color: var(--muted); }
        .summary-row .value { color: var(--text); }

        .summary-row.total {
            border-top: 1px solid var(--border);
            margin-top: 0.5rem;
            padding-top: 1rem;
        }

        .summary-row.total .label {
            font-family: 'Syne', sans-serif;
            font-weight: 700;
            font-size: 1rem;
            color: var(--text);
        }

        .summary-row.total .value {
            font-family: 'Syne', sans-serif;
            font-weight: 800;
            font-size: 1.25rem;
            color: var(--accent);
        }

        /* ── RIGHT PANEL ── */
        .panel-right {
            background: var(--bg);
            padding: 3rem 2.5rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        .checkout-title {
            font-family: 'Syne', sans-serif;
            font-weight: 800;
            font-size: 1.6rem;
            letter-spacing: -0.03em;
            line-height: 1.2;
        }

        .checkout-title span { color: var(--accent); }

        /* Form */
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }

        .form-group label {
            font-size: 0.75rem;
            font-weight: 500;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--muted);
        }

        .form-group input {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 0.75rem 1rem;
            color: var(--text);
            font-family: 'DM Sans', sans-serif;
            font-size: 0.9rem;
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-group input:focus {
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(200,245,66,0.1);
        }

        .form-group input::placeholder { color: var(--muted); }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

        /* Pay Button */
        .pay-btn {
            margin-top: auto;
            position: relative;
            background: var(--accent);
            color: #0d0d0d;
            border: none;
            border-radius: 12px;
            padding: 1rem 1.5rem;
            font-family: 'Syne', sans-serif;
            font-weight: 800;
            font-size: 1rem;
            letter-spacing: -0.01em;
            cursor: pointer;
            width: 100%;
            overflow: hidden;
            transition: transform 0.15s, box-shadow 0.15s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
        }

        .pay-btn::before {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(255,255,255,0.15);
            opacity: 0;
            transition: opacity 0.2s;
        }

        .pay-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(200,245,66,0.3); }
        .pay-btn:hover::before { opacity: 1; }
        .pay-btn:active { transform: translateY(0); }
        .pay-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

        .pay-btn .btn-amount {
            background: rgba(0,0,0,0.15);
            padding: 0.2rem 0.6rem;
            border-radius: 6px;
            font-size: 0.85rem;
        }

        /* Spinner */
        .spinner {
            width: 18px; height: 18px;
            border: 2px solid rgba(0,0,0,0.3);
            border-top-color: #0d0d0d;
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
            display: none;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .pay-btn.loading .btn-text { display: none; }
        .pay-btn.loading .spinner  { display: block; }

        /* Toast */
        .toast {
            position: fixed;
            bottom: 2rem; right: 2rem;
            padding: 0.9rem 1.4rem;
            border-radius: 12px;
            font-size: 0.875rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.6rem;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
            z-index: 9999;
            max-width: 320px;
        }

        .toast.show { transform: translateY(0); opacity: 1; }
        .toast.success { background: var(--success); color: #0d0d0d; }
        .toast.error   { background: var(--danger);  color: #fff; }
        .toast.pending { background: #f5a623; color: #0d0d0d; }

        /* Security note */
        .security-note {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.75rem;
            color: var(--muted);
            justify-content: center;
        }

        .security-note svg { width: 14px; height: 14px; flex-shrink: 0; }

        /* Responsive */
        @media (max-width: 720px) {
            .checkout-wrapper { grid-template-columns: 1fr; }
            .panel-left, .panel-right { padding: 2rem 1.5rem; }
        }
    </style>
</head>
<body>



{{-- Toast Notification --}}
<div class="toast" id="toast"></div>

<script>
    const SNAP_TOKEN = "{{ $snap_token }}";
    const btn = document.getElementById('pay-btn');

    window.snap.pay(SNAP_TOKEN, {
        onSuccess: function(result) {
            setLoading(false);
            showToast('Payment successful! Thank you.', 'success');
            console.log('Payment success:', result);                
        },
        onPending: function(result) {
            setLoading(false);
            showToast('Payment pending. Please complete it.', 'pending');
            console.log('Payment pending:', result);
        },
        onError: function(result) {
            setLoading(false);
            showToast('Payment failed. Please try again.', 'error');
            console.error('Payment error:', result);
        },
        onClose: function() {
            setLoading(false);
            showToast('Payment popup closed.', 'error');
        }
    });

    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            ${ type === 'success' ? '✓' : type === 'pending' ? '⏳' : '✕' }
            ${message}
        `;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
    }

    function setLoading(loading) {
        btn.disabled = loading;
        btn.classList.toggle('loading', loading);
    }
</script>

</body>
</html>