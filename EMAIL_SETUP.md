# Email Notifications Setup Guide

## Step 1: Get Resend API Key

1. Sign up at [https://resend.com](https://resend.com)
2. Go to **API Keys** section
3. Create new API key (copy and save securely)
4. API Key format: `re_xxxxxxxxxxxxx`

## Step 2: Deploy Supabase Edge Function

### 2.1 Install Supabase CLI (if not already installed)
```bash
npm install -g supabase
```

### 2.2 Login to Supabase
```bash
supabase login
```

### 2.3 Create Function
```bash
supabase functions new send-email-notification
```

### 2.4 Replace Function Code
Copy the contents of `supabase/functions/send-email-notification.ts` into your function file

### 2.5 Deploy Function
```bash
supabase functions deploy send-email-notification --project-id YOUR_PROJECT_ID
```

## Step 3: Add Resend API Key to Supabase

1. Go to **Supabase Dashboard** → **Settings** → **Secrets**
2. Create new secret:
   - Name: `RESEND_API_KEY`
   - Value: `re_xxxxxxxxxxxx` (your Resend API key)

## Step 4: Create Database Trigger

In Supabase **SQL Editor**, paste and run:

```sql
-- Create function to call Edge Function on new service request
CREATE OR REPLACE FUNCTION trigger_email_on_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the Edge Function
  PERFORM net.http_post(
    url := 'https://YOUR_PROJECT_ID.supabase.co/functions/v1/send-email-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer YOUR_SUPABASE_SERVICE_ROLE_KEY'
    ),
    body := jsonb_build_object(
      'record', row_to_json(NEW)
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on service_requests table
DROP TRIGGER IF EXISTS email_notification_trigger ON service_requests;
CREATE TRIGGER email_notification_trigger
AFTER INSERT ON service_requests
FOR EACH ROW
EXECUTE FUNCTION trigger_email_on_insert();
```

**Note**: Replace `YOUR_PROJECT_ID` and `YOUR_SUPABASE_SERVICE_ROLE_KEY` with actual values from:
- Project ID: Supabase Dashboard → Settings → General
- Service Role Key: Supabase Dashboard → Settings → API

## Step 5: Test Email Notifications

1. Visit your Vercel app: https://phonehub-p4ukutzan-nujokas-projects.vercel.app/first-supabase.html
2. Submit a test service request
3. Check your email and admin email (nujoka1@gmail.com) for confirmation emails
4. If not received, check:
   - Supabase function logs
   - Resend dashboard for delivery status
   - Spam/junk folder

## Troubleshooting

### Problem: Trigger not firing
- Check Supabase function logs: Dashboard → Edge Functions → Logs
- Verify service role key is correct

### Problem: Emails not received
- Check Resend dashboard for bounce/delivery issues
- Verify `RESEND_API_KEY` secret is configured
- Test API key directly: `curl https://api.resend.com/emails -X POST -H 'Authorization: Bearer YOUR_KEY'`

### Problem: CORs errors
- This is normal - Edge Functions handle it server-side
- Check Supabase function logs for actual errors

## Security Notes ⚠️

1. **Never expose Resend API key** - Always use Supabase secrets
2. **Service Role Key** - Keep this secure, only use in backend
3. **Rate Limiting** - Consider adding to prevent abuse
4. **Email Validation** - Validate email format on frontend before sending

## Next Steps

- Monitor email delivery in Resend dashboard
- Set up SPF/DKIM records for better deliverability
- Add email templates/branding
- Implement batch sending for high volume
