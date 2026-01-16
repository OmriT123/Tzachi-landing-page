/**
 * Cookie Consent Management System
 * Compliant with GDPR, Israeli PPL, and 2025 best practices
 * Hebrew interface with RTL support
 */

(function() {
    'use strict';

    const CONSENT_KEY = 'krieze_cookie_consent';
    const CONSENT_VERSION = '1.0';
    const CONSENT_EXPIRY_DAYS = 365; // 12 months

    // Default consent state
    const defaultConsent = {
        version: CONSENT_VERSION,
        timestamp: null,
        essential: true, // Always true, cannot be changed
        analytics: false,
        marketing: false
    };

    // Cookie Consent Manager
    const CookieConsent = {
        // Get current consent from localStorage
        getConsent: function() {
            try {
                const stored = localStorage.getItem(CONSENT_KEY);
                if (stored) {
                    const consent = JSON.parse(stored);
                    // Check if consent is still valid (not expired and same version)
                    if (consent.version === CONSENT_VERSION && consent.timestamp) {
                        const expiryDate = new Date(consent.timestamp);
                        expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);
                        if (new Date() < expiryDate) {
                            return consent;
                        }
                    }
                }
            } catch (e) {
                console.error('Error reading cookie consent:', e);
            }
            return null;
        },

        // Save consent to localStorage
        setConsent: function(analytics, marketing) {
            const consent = {
                version: CONSENT_VERSION,
                timestamp: new Date().toISOString(),
                essential: true,
                analytics: analytics,
                marketing: marketing
            };
            try {
                localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
                this.applyConsent(consent);
                this.hideBanner();
                this.hideSettings();
            } catch (e) {
                console.error('Error saving cookie consent:', e);
            }
        },

        // Accept all cookies
        acceptAll: function() {
            this.setConsent(true, true);
        },

        // Reject all optional cookies
        rejectAll: function() {
            this.setConsent(false, false);
        },

        // Apply consent settings (load/block scripts)
        applyConsent: function(consent) {
            if (consent.analytics) {
                this.loadAnalytics();
            }
            if (consent.marketing) {
                this.loadMarketing();
            }
        },

        // Load analytics scripts (Google Analytics placeholder)
        loadAnalytics: function() {
            // Placeholder for Google Analytics
            // Uncomment and configure when ready to use
            /*
            if (window.gtag) return; // Already loaded

            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
            */
            console.log('Analytics consent granted - scripts would load here');
        },

        // Load marketing scripts placeholder
        loadMarketing: function() {
            // Placeholder for marketing/advertising scripts
            console.log('Marketing consent granted - scripts would load here');
        },

        // Show cookie banner
        showBanner: function() {
            const banner = document.getElementById('cookie-consent-banner');
            if (banner) {
                banner.classList.remove('hidden');
                banner.setAttribute('aria-hidden', 'false');
            }
        },

        // Hide cookie banner
        hideBanner: function() {
            const banner = document.getElementById('cookie-consent-banner');
            if (banner) {
                banner.classList.add('hidden');
                banner.setAttribute('aria-hidden', 'true');
            }
        },

        // Show settings panel
        showSettings: function() {
            const settings = document.getElementById('cookie-consent-settings');
            if (settings) {
                settings.classList.remove('hidden');
                settings.setAttribute('aria-hidden', 'false');
            }
            this.hideBanner();
        },

        // Hide settings panel
        hideSettings: function() {
            const settings = document.getElementById('cookie-consent-settings');
            if (settings) {
                settings.classList.add('hidden');
                settings.setAttribute('aria-hidden', 'true');
            }
        },

        // Save settings from settings panel
        saveSettings: function() {
            const analyticsCheckbox = document.getElementById('consent-analytics');
            const marketingCheckbox = document.getElementById('consent-marketing');
            this.setConsent(
                analyticsCheckbox ? analyticsCheckbox.checked : false,
                marketingCheckbox ? marketingCheckbox.checked : false
            );
        },

        // Initialize the consent manager
        init: function() {
            const consent = this.getConsent();
            if (consent) {
                // User has already given consent
                this.applyConsent(consent);
            } else {
                // Show banner for new visitors
                this.showBanner();
            }
        }
    };

    // Helper function to create elements with attributes
    function createElement(tag, attributes, children) {
        const el = document.createElement(tag);
        if (attributes) {
            for (const [key, value] of Object.entries(attributes)) {
                if (key === 'className') {
                    el.className = value;
                } else if (key === 'textContent') {
                    el.textContent = value;
                } else if (key.startsWith('on')) {
                    el.addEventListener(key.slice(2).toLowerCase(), value);
                } else {
                    el.setAttribute(key, value);
                }
            }
        }
        if (children) {
            for (const child of children) {
                if (typeof child === 'string') {
                    el.appendChild(document.createTextNode(child));
                } else if (child) {
                    el.appendChild(child);
                }
            }
        }
        return el;
    }

    // Create cookie banner using DOM methods
    function createBanner() {
        // Create banner container
        const banner = createElement('div', {
            id: 'cookie-consent-banner',
            className: 'hidden fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-gray-200 shadow-2xl',
            role: 'dialog',
            'aria-modal': 'true',
            'aria-labelledby': 'cookie-banner-title',
            'aria-hidden': 'true'
        });

        const container = createElement('div', { className: 'max-w-6xl mx-auto px-4 py-6' });
        const wrapper = createElement('div', { className: 'md:flex md:items-center md:justify-between gap-6' });

        // Text content
        const textDiv = createElement('div', { className: 'mb-4 md:mb-0 md:flex-1' });
        const title = createElement('h2', {
            id: 'cookie-banner-title',
            className: 'text-lg font-bold text-gray-900 mb-2',
            textContent: 'אנחנו משתמשים בעוגיות'
        });
        const desc = createElement('p', { className: 'text-gray-600 text-sm leading-relaxed' });
        desc.appendChild(document.createTextNode('אנו משתמשים בעוגיות לשיפור חווית הגלישה שלך ולניתוח תנועה באתר. באפשרותך לקבל את כל העוגיות, לדחות עוגיות לא הכרחיות, או להתאים את ההעדפות שלך. '));
        const privacyLink = createElement('a', {
            href: 'privacy.html',
            className: 'text-primary hover:underline',
            textContent: 'מדיניות פרטיות'
        });
        desc.appendChild(privacyLink);

        textDiv.appendChild(title);
        textDiv.appendChild(desc);

        // Buttons
        const buttonsDiv = createElement('div', { className: 'flex flex-col sm:flex-row gap-3' });

        const rejectBtn = createElement('button', {
            className: 'py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm',
            textContent: 'דחה הכל',
            onclick: function() { CookieConsent.rejectAll(); }
        });

        const settingsBtn = createElement('button', {
            className: 'py-3 px-6 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary-50 transition-colors text-sm',
            textContent: 'הגדרות',
            onclick: function() { CookieConsent.showSettings(); }
        });

        const acceptBtn = createElement('button', {
            className: 'py-3 px-6 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-colors text-sm shadow-md',
            textContent: 'קבל הכל',
            onclick: function() { CookieConsent.acceptAll(); }
        });

        buttonsDiv.appendChild(rejectBtn);
        buttonsDiv.appendChild(settingsBtn);
        buttonsDiv.appendChild(acceptBtn);

        wrapper.appendChild(textDiv);
        wrapper.appendChild(buttonsDiv);
        container.appendChild(wrapper);
        banner.appendChild(container);

        return banner;
    }

    // Create settings panel using DOM methods
    function createSettingsPanel() {
        const overlay = createElement('div', {
            id: 'cookie-consent-settings',
            className: 'hidden fixed inset-0 z-[10000] bg-black/50 flex items-center justify-center p-4',
            role: 'dialog',
            'aria-modal': 'true',
            'aria-labelledby': 'cookie-settings-title',
            'aria-hidden': 'true'
        });

        const panel = createElement('div', {
            className: 'bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto'
        });

        // Header
        const header = createElement('div', { className: 'p-6 border-b border-gray-200' });
        const headerRow = createElement('div', { className: 'flex items-center justify-between' });
        const headerTitle = createElement('h2', {
            id: 'cookie-settings-title',
            className: 'text-xl font-bold text-gray-900',
            textContent: 'הגדרות עוגיות'
        });

        const closeBtn = createElement('button', {
            className: 'text-gray-400 hover:text-gray-600 transition-colors',
            'aria-label': 'סגור',
            onclick: function() {
                CookieConsent.hideSettings();
                CookieConsent.showBanner();
            }
        });
        const closeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        closeSvg.setAttribute('class', 'w-6 h-6');
        closeSvg.setAttribute('fill', 'none');
        closeSvg.setAttribute('stroke', 'currentColor');
        closeSvg.setAttribute('viewBox', '0 0 24 24');
        const closePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        closePath.setAttribute('stroke-linecap', 'round');
        closePath.setAttribute('stroke-linejoin', 'round');
        closePath.setAttribute('stroke-width', '2');
        closePath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        closeSvg.appendChild(closePath);
        closeBtn.appendChild(closeSvg);

        headerRow.appendChild(headerTitle);
        headerRow.appendChild(closeBtn);

        const headerDesc = createElement('p', {
            className: 'text-gray-600 text-sm mt-2',
            textContent: 'כאן תוכל לבחור אילו סוגי עוגיות להתיר. העדפותיך יישמרו למשך 12 חודשים.'
        });

        header.appendChild(headerRow);
        header.appendChild(headerDesc);

        // Content
        const content = createElement('div', { className: 'p-6 space-y-6' });

        // Essential cookies
        const essentialRow = createElement('div', { className: 'flex items-start justify-between gap-4 pb-4 border-b border-gray-100' });
        const essentialText = createElement('div', { className: 'flex-1' });
        essentialText.appendChild(createElement('h3', {
            className: 'font-semibold text-gray-900 mb-1',
            textContent: 'עוגיות הכרחיות'
        }));
        essentialText.appendChild(createElement('p', {
            className: 'text-gray-500 text-sm',
            textContent: 'עוגיות אלה נחוצות לתפקוד האתר ואינן ניתנות לביטול.'
        }));
        const essentialBadge = createElement('div', { className: 'flex-shrink-0' });
        essentialBadge.appendChild(createElement('span', {
            className: 'inline-block bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full',
            textContent: 'תמיד פעיל'
        }));
        essentialRow.appendChild(essentialText);
        essentialRow.appendChild(essentialBadge);

        // Analytics cookies
        const analyticsRow = createElement('div', { className: 'flex items-start justify-between gap-4 pb-4 border-b border-gray-100' });
        const analyticsText = createElement('div', { className: 'flex-1' });
        analyticsText.appendChild(createElement('h3', {
            className: 'font-semibold text-gray-900 mb-1',
            textContent: 'עוגיות ביצועים וניתוח'
        }));
        analyticsText.appendChild(createElement('p', {
            className: 'text-gray-500 text-sm',
            textContent: 'עוגיות אלה עוזרות לנו להבין כיצד מבקרים משתמשים באתר ולשפר את החוויה.'
        }));
        const analyticsToggle = createToggle('consent-analytics');
        analyticsRow.appendChild(analyticsText);
        analyticsRow.appendChild(analyticsToggle);

        // Marketing cookies
        const marketingRow = createElement('div', { className: 'flex items-start justify-between gap-4' });
        const marketingText = createElement('div', { className: 'flex-1' });
        marketingText.appendChild(createElement('h3', {
            className: 'font-semibold text-gray-900 mb-1',
            textContent: 'עוגיות שיווק'
        }));
        marketingText.appendChild(createElement('p', {
            className: 'text-gray-500 text-sm',
            textContent: 'עוגיות אלה משמשות להצגת פרסומות רלוונטיות ומעקב אחר קמפיינים שיווקיים.'
        }));
        const marketingToggle = createToggle('consent-marketing');
        marketingRow.appendChild(marketingText);
        marketingRow.appendChild(marketingToggle);

        content.appendChild(essentialRow);
        content.appendChild(analyticsRow);
        content.appendChild(marketingRow);

        // Footer
        const footer = createElement('div', { className: 'p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end' });
        const footerRejectBtn = createElement('button', {
            className: 'py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm',
            textContent: 'דחה הכל',
            onclick: function() { CookieConsent.rejectAll(); }
        });
        const saveBtn = createElement('button', {
            className: 'py-3 px-6 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-colors text-sm shadow-md',
            textContent: 'שמור העדפות',
            onclick: function() { CookieConsent.saveSettings(); }
        });
        footer.appendChild(footerRejectBtn);
        footer.appendChild(saveBtn);

        panel.appendChild(header);
        panel.appendChild(content);
        panel.appendChild(footer);
        overlay.appendChild(panel);

        return overlay;
    }

    // Create toggle switch
    function createToggle(id) {
        const wrapper = createElement('div', { className: 'flex-shrink-0' });
        const label = createElement('label', { className: 'relative inline-flex items-center cursor-pointer' });
        const input = createElement('input', {
            type: 'checkbox',
            id: id,
            className: 'sr-only peer'
        });
        const toggle = createElement('div', {
            className: 'w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary'
        });
        label.appendChild(input);
        label.appendChild(toggle);
        wrapper.appendChild(label);
        return wrapper;
    }

    // Initialize when DOM is ready
    function init() {
        document.body.appendChild(createBanner());
        document.body.appendChild(createSettingsPanel());
        CookieConsent.init();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose to global scope
    window.CookieConsent = CookieConsent;

})();
