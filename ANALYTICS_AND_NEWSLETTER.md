Analytics & Newsletter setup

1) Google Analytics (GA4) - simple snippet

Replace `G-XXXXXXXXXX` with your measurement ID and paste into `<head>` of each HTML page (or include via `analytics.js`):

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);} 
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

2) Matomo (self-hosted) - tracking placeholder

```html
<!-- Matomo -->
<script>
  var _paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="https://YOUR_MATOMO_URL/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Matomo -->
```

3) Newsletter backend

- I added a minimal backend in `backend/` that accepts POST /subscribe and appends emails to `backend/subscribers.csv`.
- To use it publicly, deploy `backend/` to Railway/Heroku/Fly or any Node host and set the frontend form to POST to the deployed `/subscribe` URL.

Example fetch from client (replace URL):

```javascript
fetch('https://your-backend.example.com/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com' })
}).then(r => r.json()).then(console.log).catch(console.error);
```

4) Quick integration into current site

- Update `blog.html` and `contact.html` newsletter form to call the backend via `fetch` (client-side).
- Or use a hosted solution (Formspree, Getform, Netlify Forms) and change the `action` attribute to their endpoint.

5) Privacy & GDPR

- Store consent and timestamp.
- Provide unsubscribe and a privacy policy explaining storage and retention.

