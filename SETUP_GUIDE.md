# Aarunya MITS Setup Guide

## Google OAuth Configuration

To fix the "Unsupported provider: provider is not enabled" error, you need to enable Google OAuth in your Supabase dashboard.

### Steps to Enable Google OAuth:

1. **Go to Supabase Dashboard**
   - Visit [supabase.com](https://supabase.com)
   - Sign in to your project

2. **Navigate to Authentication Settings**
   - In your project dashboard
   - Go to **Authentication** > **Settings**

3. **Enable Google OAuth**
   - Scroll down to **External OAuth Providers**
   - Toggle **Google** to **ON**
   - Click **Save**

4. **Configure Google OAuth**
   - Click on **Google** to expand settings
   - Set **Client ID** and **Client Secret** (from Google Cloud Console)
   - Add **Authorized redirect URLs**:
     - `http://localhost:5173/auth/callback`
     - `https://your-domain.com/auth/callback`
   - Set **Authorized domains** (your domain)

5. **Enable Domain Restrictions (Optional but Recommended)**
   - In Google OAuth settings, add `hd=mitgwl.ac.in` parameter
   - This restricts login to only @mitsgwl.ac.in email addresses

6. **Configure Google Cloud Console**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable **Google+ API** and **People API**
   - Create **OAuth 2.0 Client ID**
   - Set **Authorized redirect URIs** to match Supabase settings
   - Set **Authorized domains** to your domain

### Domain Restriction Setup

To restrict Google OAuth to only MITS students:

1. In Supabase Google OAuth settings, add the parameter:
   ```
   hd=mitgwl.ac.in
   ```

2. This ensures only users with @mitsgwl.ac.in email addresses can authenticate.

### Testing

After enabling Google OAuth:
1. Restart your development server
2. Try the Google OAuth login flow
3. Verify that only @mitsgwl.ac.in emails are accepted

## Environment Variables

Make sure all required environment variables are set in your Supabase project:

### Supabase Dashboard > Settings > Config
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REFRESH_TOKEN=your-google-refresh-token
GOOGLE_EMAIL=your-email@mitgwl.ac.in
```

### Frontend .env.local
```
VITE_SUPABASE_URL=https://kfbdwklyyoltcjjzeozv.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_5L4igMm5feh-Yh6cOhlYmQ_d0_puXsl
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_RAZORPAY_KEY_ID=your-razorpay-key-id
VITE_RAZORPAY_KEY_SECRET=your-razorpay-key-secret
VITE_EMAIL_API_URL=https://kfbdwklyyoltcjjzeozv.supabase.co/functions/v1/send-email
VITE_EMAIL_API_KEY=your-supabase-anon-key
```

## Troubleshooting

### Common Issues:

1. **"Unsupported provider" error**
   - Ensure Google OAuth is enabled in Supabase dashboard
   - Check that the provider is toggled ON

2. **Domain restriction not working**
   - Verify `hd=mitgwl.ac.in` parameter is set
   - Check Google Cloud Console domain verification

3. **Redirect URI mismatch**
   - Ensure redirect URIs match exactly between Google and Supabase
   - Include both localhost and production URLs

4. **Email service not working**
   - Verify Google OAuth credentials are correct
   - Check that Gmail API is enabled in Google Cloud Console
   - Ensure proper scopes are configured

### Need Help?

- Check Supabase documentation: https://supabase.com/docs/guides/auth/social-login/auth-google
- Google OAuth setup guide: https://developers.google.com/identity/protocols/oauth2
- Contact support for further assistance