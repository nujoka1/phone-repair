# PhoneHub Admin Dashboard Setup Guide

## Overview
The Admin Dashboard is a **password-protected analytics page** that allows you to view all service requests, generate reports, and monitor business metrics in real-time.

**Live URL**: `https://phonehub-p4ukutzan-nujokas-projects.vercel.app/admin.html`

---

## ⚙️ Setup Instructions

### Step 1: Update Supabase Credentials in admin.html

Open [admin.html](admin.html) and find these lines (around line 260-263):

```javascript
// Supabase Configuration (from first-supabase.html)
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

Replace with your actual Supabase credentials (same as in [first-supabase.html](first-supabase.html)):

```javascript
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGc... (your full key)';
```

**Save the file**

---

### Step 2: Set Admin Password

In the same file, find this line (around line 265):

```javascript
const ADMIN_PASSWORD = 'PhoneHub2024'; // Change this to your desired password
```

Change to your preferred password:

```javascript
const ADMIN_PASSWORD = 'YourSecurePassword123'; // Change this to your desired password
```

⚠️ **Security Note**: 
- For production, consider using environment variables instead
- Avoid sharing this password in code commits
- Use a strong, unique password

**Save the file**

---

### Step 3: Commit and Deploy

```bash
cd "/home/nujoka/Documents/html and css"
git add admin.html
git commit -m "Configure admin dashboard with Supabase credentials"
git push origin master
```

Vercel will auto-deploy within 1-2 minutes.

---

### Step 4: Access the Admin Dashboard

1. Visit: `https://phonehub-p4ukutzan-nujokas-projects.vercel.app/admin.html`
2. Enter the admin password you set
3. Click **Login**

---

## 📊 Dashboard Features

### Analytics Cards
- **Total Requests**: All service requests ever submitted
- **Top Device Type**: Most common device being repaired
- **Top Repair Type**: Most common repair being requested

### Filters
- **Date Range**: Filter requests by submission date
- **Device Type**: Filter by specific device (iPhone, Samsung, Google, OnePlus, Other)
- **Apply Filters**: See results update in real-time

### Charts
- **Device Type Chart**: Pie/doughnut chart showing distribution
- **Repair Type Chart**: Bar chart showing repair request distribution

### Recent Requests Table
- **Sortable Columns**: Click column headers to sort (↕ icon)
- **All Information**: Name, Email, Phone, Device, Model, Repair Type, Description, Service Date, Submission Time
- **Pagination**: Navigate through requests 15 at a time

### Export Data
- **Export to CSV**: Download all filtered requests as a CSV file for:
  - Excel analysis
  - Reports
  - Backup
  - Integration with other tools

---

## 🔄 Real-time Updates (Phase 3)

The dashboard is **ready for real-time notifications**. When enabled:
- Dashboard auto-updates when new requests are submitted
- Browser notifications appear ("📩 New request from [name]!")
- Sound alert plays when new submission arrives
- "Live Updates" indicator shows connection status

**Status**: Code ready, activation pending

---

## 🔐 Password Protection Details

### How It Works
1. User enters password on login page
2. JavaScript compares against hardcoded `ADMIN_PASSWORD`
3. If correct, session stored in `localStorage` as `adminLoggedIn: true`
4. Dashboard displays; refresh page maintains login
5. Click "Logout" to clear session and return to login

### Logout
- Click **Logout** button in top-right
- Clears session and returns to login page
- Real-time listener is disconnected

---

## 🐛 Troubleshooting

### Problem: "Invalid password" error
- **Solution**: Check that password is entered exactly (case-sensitive)
- Verify you updated the correct `ADMIN_PASSWORD` in admin.html

### Problem: No requests showing
- **Solution**: Ensure Supabase credentials are correct
- Verify service_requests table exists in Supabase
- Check that the table has data (submit a test request)

### Problem: Charts not displaying
- **Solution**: Check browser console for errors (`F12` → Console)
- Ensure Chart.js library is not blocked
- Try clearing browser cache and reload

### Problem: Filters not working
- **Solution**: Make sure date format is correct (YYYY-MM-DD)
- Try applying filters one at a time
- Check browser console for JavaScript errors

### Problem: Can't access admin page
- **Solution**: Verify URL is correct
- Clear browser cache
- Try incognito/private window
- Check that admin.html was deployed (visible in Vercel GitHub)

### Problem: Getting "Supabase not configured" error
- **Solution**: Double-check credentials in admin.html
- Ensure no extra spaces or special characters
- Verify credentials match first-supabase.html
- Test the public form first-supabase.html to confirm DB works

---

## 📈 Sample Workflow

### Daily Analytics Check
1. Visit admin.html and login
2. Review total requests and top categories
3. Check recent submissions table
4. Use filters to analyze specific time periods

### Weekly Report
1. Use date range filter (last 7 days)
2. Export to CSV
3. Open in Excel and create charts
4. Share with team

### Device Trend Analysis
1. Apply no filters to see all-time data
2. Check "Top Device Type" card
3. Click device type chart to see distribution
4. Plan inventory based on trends

---

## 🔗 Links

- **Live Admin Dashboard**: https://phonehub-p4ukutzan-nujokas-projects.vercel.app/admin.html
- **Main Website**: https://phonehub-p4ukutzan-nujokas-projects.vercel.app/phone-repair.html
- **Service Request Form**: https://phonehub-p4ukutzan-nujokas-projects.vercel.app/first-supabase.html
- **GitHub Repository**: https://github.com/nujoka1/phone-repair
- **Supabase Dashboard**: https://supabase.com/dashboard

---

## ⏭️ Next Steps

### Phase 3: Real-time Updates
When you're ready, I can enable:
- ✅ Live submission alerts as requests come in
- ✅ Browser push notifications
- ✅ Auto-refresh dashboard on new data
- ✅ Sound alerts

Just let me know!

---

## 📝 Security Best Practices

1. **Change Default Password**: Don't use 'PhoneHub2024' in production
2. **Use Environment Variables**: Store password in Vercel secrets (advanced)
3. **Rotate Password Regularly**: Change every 3 months
4. **HTTPS Only**: Admin page is HTTPS-only (Vercel default)
5. **Monitor Access**: Check GitHub logs for deployments
6. **Backup Data**: Supabase auto-backs up data (see Supabase docs)

---

**Dashboard Status**: ✅ Ready to Use!

For questions or to enable real-time updates, refer to [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) or contact support.
