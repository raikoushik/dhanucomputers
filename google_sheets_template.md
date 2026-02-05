# 📊 GOOGLE SHEETS INVENTORY TEMPLATE

## Quick Setup

### Step 1: Create New Google Sheet
Name it: "Dhanu Computers - Laptop Inventory"

### Step 2: Add These Column Headers (Row 1)

| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H | Column I | Column J |
|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
| Image URL | Brand | Model | Processor | RAM | Storage | Display | Price | Category | Status |

### Step 3: Example Data Rows

Copy these examples:

**Row 2 (Dell Latitude):**
```
https://i.ibb.co/placeholder.jpg | Dell | Latitude 7490 | Intel Core i5-8350U (8th Gen) | 16GB | 256GB SSD | 14" FHD | 22999 | refurbished,business | Available
```

**Row 3 (HP EliteBook):**
```
https://i.ibb.co/placeholder.jpg | HP | EliteBook 840 G5 | Intel Core i7-8650U (8th Gen) | 16GB | 512GB SSD | 14" FHD Touch | 28999 | refurbished,business | Available
```

**Row 4 (Lenovo ThinkPad):**
```
https://i.ibb.co/placeholder.jpg | Lenovo | ThinkPad T480 | Intel Core i5-8250U (8th Gen) | 8GB | 256GB SSD | 14" FHD | 19999 | refurbished,business | Available
```

**Row 5 (Gaming Laptop):**
```
https://i.ibb.co/placeholder.jpg | Dell | Inspiron Gaming | Intel Core i5 • NVIDIA GTX 1650 | 8GB | 512GB SSD | 15.6" FHD 120Hz | 45999 | gaming,new | Available
```

---

## Column Instructions

### Column A: Image URL
- Upload images to [ImgBB](https://imgbb.com/) (free)
- Get "Direct link"
- Paste here
- **Important:** Use direct image URLs only

### Column B: Brand
Examples:
- Dell
- HP
- Lenovo
- Asus
- Acer

### Column C: Model
Examples:
- Latitude 7490
- EliteBook 840 G5
- ThinkPad T480
- Inspiron 15 3000

### Column D: Processor
Examples:
- Intel Core i5-8350U (8th Gen)
- Intel Core i7-10510U (10th Gen)
- AMD Ryzen 5 5500U
- Intel Core i5 • NVIDIA GTX 1650

### Column E: RAM
Examples:
- 8GB
- 16GB
- 32GB

### Column F: Storage
Examples:
- 256GB SSD
- 512GB SSD
- 1TB HDD
- 256GB SSD + 1TB HDD

### Column G: Display
Examples:
- 14" FHD
- 15.6" FHD
- 13.3" FHD Touch
- 15.6" FHD 120Hz

### Column H: Price
- Enter numbers only (no ₹ symbol)
- Example: 22999
- Website will add ₹ automatically

### Column I: Category
**Important:** Use comma-separated tags
- refurbished,business
- new,business
- gaming,new
- refurbished,student
- business
- gaming

**Available categories:**
- new
- refurbished
- business
- gaming
- student

### Column J: Status
**Only two options:**
- Available (shows on website)
- Sold (hides from website)

When laptop is sold, just change "Available" to "Sold"

---

## Publishing Your Sheet

### Step 1: File → Share → Publish to web

### Step 2: Choose:
- **What to publish:** Entire document (or specific sheet)
- **Format:** Comma-separated values (.csv)

### Step 3: Click "Publish"

### Step 4: Copy the URL
It will look like:
```
https://docs.google.com/spreadsheets/d/e/2PACX-1vS.../pub?output=csv
```

### Step 5: Paste this URL in stock.html
Find this line:
```javascript
const SHEET_URL = 'YOUR-GOOGLE-SHEET-CSV-URL';
```

Replace with your actual URL.

---

## How It Works

1. **You add laptop to Google Sheet**
2. **Save (auto-saves)**
3. **Refresh website**
4. **Laptop appears automatically!**

When someone buys:
1. Change "Available" to "Sold" in Status column
2. Save
3. Laptop disappears from website

---

## Advanced Tips

### Multiple Images
Currently supports 1 image per laptop.

**To add image gallery (future upgrade):**
Add columns: Image_2, Image_3, Image_4

### Pricing Strategies
**Column K: Original Price** (optional)
- Show "was ₹35,999, now ₹28,999"
- Great for offers

**Column L: Offer Label** (optional)
- "Limited Offer"
- "New Arrival"
- "Hot Deal"

### Stock Quantity
**Column M: Quantity** (optional)
- Track how many units available
- Show "Only 2 left!"

---

## Maintenance Schedule

### Daily (If Active)
- Update Status when laptops sold
- Add new arrivals

### Weekly
- Check all image links working
- Update prices if needed
- Remove old listings

### Monthly
- Archive sold items to "Sold History" sheet
- Review what's selling best

---

## Common Issues & Fixes

### Issue: Images not showing
**Fix:** 
- Check image URL is direct link
- Try uploading to ImgBB again
- Make sure URL starts with `https://`

### Issue: Laptop not appearing on website
**Fix:**
- Check Status is exactly "Available" (capital A)
- Make sure row has all required columns filled
- Clear browser cache and refresh

### Issue: Price showing wrong
**Fix:**
- Remove any ₹ symbols from price column
- Use numbers only: 22999, not 22,999

### Issue: Category filter not working
**Fix:**
- Check category spelling matches exactly
- Use lowercase: "business", not "Business"
- Use commas for multiple: "refurbished,business"

---

## Sample Sheet Structure

```
| Image URL                        | Brand  | Model           | Processor              | RAM   | Storage    | Display      | Price | Category             | Status    |
|----------------------------------|--------|-----------------|------------------------|-------|------------|--------------|-------|----------------------|-----------|
| https://i.ibb.co/xyz.jpg         | Dell   | Latitude 7490   | Intel i5-8350U         | 16GB  | 256GB SSD  | 14" FHD      | 22999 | refurbished,business | Available |
| https://i.ibb.co/abc.jpg         | HP     | EliteBook 840   | Intel i7-8650U         | 16GB  | 512GB SSD  | 14" FHD      | 28999 | refurbished,business | Available |
| https://i.ibb.co/def.jpg         | Lenovo | ThinkPad T480   | Intel i5-8250U         | 8GB   | 256GB SSD  | 14" FHD      | 19999 | refurbished,business | Available |
| https://i.ibb.co/ghi.jpg         | Dell   | Inspiron Gaming | i5 + GTX 1650          | 8GB   | 512GB SSD  | 15.6" 120Hz  | 45999 | gaming,new           | Available |
| https://i.ibb.co/jkl.jpg         | HP     | Pavilion 15     | AMD Ryzen 5            | 8GB   | 512GB SSD  | 15.6" FHD    | 35999 | new,student          | Sold      |
```

---

## Backup & Recovery

### Weekly Backup
1. File → Download → Microsoft Excel (.xlsx)
2. Save to your computer
3. Keep last 4 weeks of backups

### If Sheet Gets Corrupted
1. Open backup file
2. File → Upload → Replace sheet
3. Re-publish to web

---

## Security Notes

### What's Public
- ✅ Laptop specs, prices, images
- ❌ Your personal data (not in sheet)
- ❌ Customer information (never in this sheet)

### What to Never Add
- Customer names
- Phone numbers
- Addresses
- Payment information

Keep this sheet ONLY for public inventory.

---

## Scaling Up

### When You Have 50+ Laptops
Create separate sheets:
- Sheet 1: "Current Stock"
- Sheet 2: "Sold History"
- Sheet 3: "Coming Soon"

Publish only "Current Stock" sheet to website.

### Multiple Locations
Add Column N: Location
- Bengaluru - Main Shop
- Bengaluru - Warehouse
- Bengaluru - Service Center

---

## Pro Tips

1. **Use Consistent Naming**
   - "Intel Core i5-8350U", not "i5 8th gen"
   - Helps with search & filtering

2. **Image Quality**
   - Use 800x600 pixels
   - Keep file size under 200KB
   - Clean background preferred

3. **Pricing Psychology**
   - 22999 looks better than 23000
   - Show original price if offering discount

4. **Category Strategy**
   - Use multiple categories for cross-listing
   - "refurbished,business,student" = shows in 3 filters

5. **Status Beyond "Available" & "Sold"**
   - "Reserved" (pending payment)
   - "In Repair" (coming back soon)
   - Website only shows "Available"

---

## Integration Workflow

```
1. Open Google Sheet
2. Add new laptop details
3. Upload image to ImgBB
4. Paste image URL
5. Fill all columns
6. Set Status = "Available"
7. Save (auto)
8. Refresh website → Laptop appears!
```

**Time per laptop: 2-3 minutes**

---

## Questions?

Refer to SETUP_GUIDE.md for:
- How to connect sheet to website
- Troubleshooting
- Advanced features

---

*This template is designed for easy inventory management*
*Update once, reflects everywhere*
