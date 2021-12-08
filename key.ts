const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode("some-random-secret-key"),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign", "verify"],
  );

export default key;