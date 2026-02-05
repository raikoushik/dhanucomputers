# 🚀 DHANU COMPUTERS — WORLD-CLASS WEBSITE SETUP GUIDE

## 📋 What You've Received

A **world-class luxury psychic-driven website** with full control capabilities:

### ✅ Complete Website Structure
- **index.html** — Homepage (Luxury psychic design)
- **stock.html** — Available Stock (Dynamic inventory)
- **blog.html** — Insights & Guidance (SEO-optimized)
- **about.html** — About Page (Trust story)

### ✅ Design Features
- Dual-energy luxury system (Spiritual-calm × Tech-mystic)
- Premium typography (Cormorant Garamond + Inter + Space Grotesk)
- Emerald & Gold accent colors
- Smooth animations & scroll reveals
- Mobile responsive
- Fast loading
- SEO-optimized

---

## 🎯 PHASE 1: QUICK LAUNCH (5 Minutes)

### Option A: Netlify (Recommended — Easiest)

**Step 1:** Go to [https://www.netlify.com](https://www.netlify.com)

**Step 2:** Sign up with Google (free)

**Step 3:** Click "Add new site" → "Deploy manually"

**Step 4:** Drag & drop all 4 HTML files:
- index.html
- stock.html
- blog.html
- about.html

**Step 5:** Done! ✅

Your site is now live at: `https://your-site-name.netlify.app`

### Option B: Google Sites Embedded

**Step 1:** Upload all files to Netlify (as above)

**Step 2:** Open [Google Sites](https://sites.google.com)

**Step 3:** Create new site

**Step 4:** Insert → Embed → Enter your Netlify URL

**Step 5:** Make it full width

This gives you the luxury website INSIDE Google Sites for easy updates.

---

## 🎨 PHASE 2: CUSTOMIZATION (Easy Updates)

### 1️⃣ Update Banner Images (No Coding)

**For Hero Section Background:**

Find this in `index.html` (around line 500):
```html
<div class="hero-content">
```

**To add background image:**
Add this style to the `.hero` section:
```css
.hero {
    background: linear-gradient(rgba(10, 14, 26, 0.7), rgba(10, 14, 26, 0.9)),
                url('YOUR-IMAGE-URL-HERE') center/cover;
}
```

**Where to get image URLs:**
- Upload to [ImgBB](https://imgbb.com/) (free)
- Copy direct link
- Paste in code

### 2️⃣ Update Product Images

**In stock.html**, replace:
```html
<div class="laptop-image">💻</div>
```

With:
```html
<img src="YOUR-IMAGE-URL" alt="Laptop" style="width: 100%; height: 220px; object-fit: cover;">
```

### 3️⃣ Change Colors (If Needed)

In any HTML file, find the `:root` section and modify:
```css
--emerald-glow: #2DD4BF;  /* Change this for accent color */
--gold-muted: #D4AF37;    /* Change this for price color */
```

---

## 📊 PHASE 3: GOOGLE SHEETS INTEGRATION (Dynamic Stock Updates)

### Why This Matters
Update your laptop inventory in Google Sheets → Website updates automatically. No coding needed!

### Setup Instructions

**Step 1:** Create Google Sheet

Column structure:
```
| Image URL | Brand | Model | Processor | RAM | Storage | Display | Price | Category | Status |
```

Example row:
```
| https://i.ibb.co/image.jpg | Dell | Latitude 7490 | Intel i5-8350U | 16GB | 256GB SSD | 14" FHD | 22999 | refurbished,business | Available |
```

**Step 2:** Publish Sheet

- File → Share → Publish to web
- Choose "Comma-separated values (.csv)"
- Copy the URL

**Step 3:** Add Integration Code to stock.html

Add this BEFORE the closing `</script>` tag:

```javascript
// Google Sheets Integration
const SHEET_URL = 'YOUR-GOOGLE-SHEET-CSV-URL';

async function loadInventory() {
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Skip header
        
        const stockGrid = document.getElementById('stockGrid');
        stockGrid.innerHTML = ''; // Clear existing
        
        rows.forEach(row => {
            const cols = row.split(',');
            if (cols.length < 10) return; // Skip invalid rows
            
            const [imageUrl, brand, model, processor, ram, storage, display, price, category, status] = cols;
            
            if (status.toLowerCase() !== 'available') return; // Skip sold items
            
            const card = `
                <div class="laptop-card" data-category="${category}">
                    <img src="${imageUrl}" alt="${brand} ${model}" class="laptop-image" 
                         onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22><text y=%2250%%22 x=%2250%%22>💻</text></svg>'">
                    <span class="laptop-badge ${category.includes('refurbished') ? 'refurbished' : ''}">${category.includes('refurbished') ? 'Refurbished' : 'New'}</span>
                    <div class="laptop-content">
                        <div class="laptop-brand">${brand}</div>
                        <h3 class="laptop-model">${model}</h3>
                        <div class="laptop-specs">
                            <div class="spec-item">
                                <svg class="spec-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                                </svg>
                                ${processor}
                            </div>
                            <div class="spec-item">
                                <svg class="spec-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                                </svg>
                                ${ram} • ${storage}
                            </div>
                            <div class="spec-item">
                                <svg class="spec-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                ${display}
                            </div>
                        </div>
                        <div class="laptop-price">₹${price}</div>
                        <a href="https://wa.me/919591555095?text=I'm%20interested%20in%20${brand}%20${model}" class="laptop-cta">
                            Enquire Now
                        </a>
                    </div>
                </div>
            `;
            
            stockGrid.innerHTML += card;
        });
    } catch (error) {
        console.error('Failed to load inventory:', error);
    }
}

// Load inventory on page load
window.addEventListener('load', loadInventory);
```

**Step 4:** Test

1. Add laptops to your Google Sheet
2. Refresh your website
3. Products appear automatically!

---

## 📝 PHASE 4: BLOG MANAGEMENT (Future Content)

### Option 1: Manual HTML Pages (Simple)

Create `blog-article-1.html` and link from blog.html:

```html
<article class="blog-card" onclick="window.location='blog-article-1.html'">
```

### Option 2: Google Docs → Website (Advanced)

1. Write article in Google Docs
2. File → Publish to web → Get link
3. Embed in iframe on blog page

---

## 🎯 PHASE 5: ADVANCED FEATURES (Optional)

### Image Galleries

Add image slider in stock page:
```html
<div class="image-slider">
    <img src="image1.jpg" alt="Laptop">
    <img src="image2.jpg" alt="Laptop Detail">
    <img src="image3.jpg" alt="Laptop Ports">
</div>
```

### Customer Reviews

Add after trust section in index.html:
```html
<section class="reviews-section">
    <h2>What Clients Say</h2>
    <div class="review-grid">
        <div class="review-card">
            <p>"Excellent service and honest advice..."</p>
            <strong>— Rajesh K.</strong>
        </div>
    </div>
</section>
```

### Google Analytics (Track Visitors)

Add before `</head>` in ALL pages:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

---

## 🔍 SEO OPTIMIZATION CHECKLIST

### ✅ Already Done
- Meta titles & descriptions
- Schema.org LocalBusiness markup
- Semantic HTML structure
- Fast loading design
- Mobile responsive

### 📝 You Should Do
1. **Google Search Console**
   - Verify ownership
   - Submit sitemap

2. **Google My Business**
   - Create business profile
   - Link to website

3. **Regular Content**
   - Add 1 blog post per month
   - Use keywords: "laptop repair Bengaluru", "refurbished laptops", etc.

---

## 📱 CONNECTING CUSTOM DOMAIN

### If You Own .com or .in Domain

**On Netlify:**
1. Domain settings → Add custom domain
2. Add your domain name
3. Configure DNS (Netlify gives instructions)
4. Free SSL certificate auto-enabled

**On Google Sites:**
1. Settings → Custom domains
2. Follow Google's verification steps

---

## 🛠️ MAINTENANCE GUIDE

### Weekly Tasks
- ✅ Update stock.html with new arrivals
- ✅ Check WhatsApp integration working

### Monthly Tasks
- ✅ Add 1 blog post (SEO boost)
- ✅ Update prices if needed
- ✅ Check Google Analytics

### Quarterly Tasks
- ✅ Add customer testimonials
- ✅ Update "Available Stock" photos
- ✅ Review and refresh homepage copy

---

## 📞 SUPPORT & QUESTIONS

### Quick Fixes

**WhatsApp not working?**
- Check all links have `https://wa.me/919591555095`
- Make sure no spaces in URL

**Images not loading?**
- Use direct image URLs (ImgBB, Google Drive public links)
- Check file size < 500KB for fast loading

**Mobile view looks broken?**
- This shouldn't happen — design is fully responsive
- Try clearing browser cache

---

## 🎉 FINAL CHECKLIST

Before going live:

- [ ] All WhatsApp numbers correct (+91 95915 55095)
- [ ] All internal links work (index.html, stock.html, etc.)
- [ ] At least 3 laptops in stock page
- [ ] Instagram link updated (@dhanu_computers2013)
- [ ] Test on mobile phone
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Share with 3 friends for feedback

---

## 🚀 YOU'RE READY!

You now have a **world-class website** that:
- ✅ Looks like a ₹1 lakh premium site
- ✅ Easy to update (no developer needed)
- ✅ SEO-optimized for Google ranking
- ✅ Luxury psychic design (unique positioning)
- ✅ Full control over content

**Next Steps:**
1. Upload to Netlify (5 minutes)
2. Share link with customers
3. Update Google My Business
4. Start adding blog posts

---

## 💡 PRO TIPS

### Conversion Boosters
1. **Update stock weekly** — shows you're active
2. **Add customer photos** — with permission
3. **Post Instagram stories** — link to website
4. **WhatsApp status** — share new arrivals
5. **Respond within 5 minutes** — builds trust

### SEO Boosters
1. **Blog titles**: "Best Laptop for Students Under 25000"
2. **Location keywords**: "Bengaluru", "Bangalore"
3. **Service keywords**: "laptop repair", "refurbished laptops"
4. **Long-tail keywords**: "Dell Latitude 7490 price in Bangalore"

---

## 🎯 WHAT MAKES THIS WORLD-CLASS

This isn't a template website. This is:

✅ **Psychic-driven design** — Calm authority, not salesy
✅ **Premium typography** — Luxury brand-level fonts
✅ **Dual-energy system** — Spiritual-calm × Tech-mystic
✅ **Strategic copy** — "Technology chosen with clarity"
✅ **Trust architecture** — Since 2013, 500+ systems, local
✅ **Guided action** — "Get clarity before you decide"
✅ **Future-proof** — Easy updates, scalable, SEO-ready

Most local businesses have noisy, template sites.

**You have quiet dominance.**

---

## 📧 QUESTIONS?

If stuck, remember:
1. This guide has 90% of answers
2. Google/YouTube has the rest
3. Netlify has excellent documentation
4. WhatsApp me if truly stuck

**You've got this! 💪**

---

*Created with precision and clarity for Dhanu Computers*
*Technology chosen with wisdom since 2013*
