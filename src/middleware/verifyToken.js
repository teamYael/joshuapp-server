app.post("/api/token", (req, res, next) => {
    const { body } = req;
    console.log(body);
    const idToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1MDAyNTM4NzIyMjQtZWphcmxkYWhlczBzZG5nNWRnazI2MTFhaTRldWFsZ3AuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1MDAyNTM4NzIyMjQtNnBvcnYybjlydXRlMmM0YWlpN3AxMnAzNGlpZjEydjEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDY4Njc4NjE4OTQ2MzAxMTY5MjIiLCJlbWFpbCI6InlhZWxtc3BAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJZYWVsIE1hcnRpbmV6IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FMbTV3dTE3ZVdtbEgwTHpBbldhTEk0aVZZYTJqODRhcE5yVHV3S2hXWnNtVlE9czk2LWMiLCJnaXZlbl9uYW1lIjoiWWFlbCIsImZhbWlseV9uYW1lIjoiTWFydGluZXoiLCJsb2NhbGUiOiJlcyIsImlhdCI6MTY2NjE3MzczOCwiZXhwIjoxNjY2MTc3MzM4fQ.NM1V8nU5Fq7vv4eRCM1w7MfCqOUuBaks_qy9FndFtyJXZ_-gSvp6EutM4AtYDWJXFXDUxpV5Sh5dOn72O9ZOzdK32hQuKuBEdiT3oMJwB8dVy0Yi_soHeUiS0VpSOwlrGKknM0B18TpYIw1ji6fZ1H1My1t4wxyyKAGy0qQgte-Vx9jyp6sG9dEX30TzS8Jbfca332ZU_p4KyKVhEEtfxxbSDSVIzkfN8QpKZwYzk9By5Z8QMuI8AyOil0uScuHIgKF0f9zlLSkuFDUUjD1l8MGm_1hFCy8TFUJMCgHb1AhDRitV1OG3fWnQQcEDCqFPoOzgXuixAxxK6e6pTUtMxg";
    console.log(idToken);
    console.log(admin)
    admin
      .auth() 
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        console.log(uid);
        console.log('LETS GOOOOO');
        next();
      })
      .catch((error) => {
        res.json({
          error: false,
          message: "Eres GILIPOLLAS",
        });
      });
  });