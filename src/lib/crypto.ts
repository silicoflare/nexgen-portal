export async function importKey(key: string): Promise<CryptoKey> {
  const rawKey = Uint8Array.from(atob(key), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(
  plaintext: string,
  key: CryptoKey
): Promise<string> {
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(plaintext)
  );

  const ivBase64 = btoa(String.fromCharCode(...iv));
  const ciphertextBase64 = btoa(
    String.fromCharCode(...new Uint8Array(ciphertext))
  );

  return `${ivBase64}.${ciphertextBase64}`;
}

export async function decrypt(
  encryptedData: string,
  key: CryptoKey
): Promise<string> {
  const [ivBase64, ciphertextBase64] = encryptedData.split(".");
  if (!ivBase64 || !ciphertextBase64)
    throw new Error("Invalid encrypted format");

  const iv = new Uint8Array(
    atob(ivBase64)
      .split("")
      .map((c) => c.charCodeAt(0))
  );
  const ciphertext = new Uint8Array(
    atob(ciphertextBase64)
      .split("")
      .map((c) => c.charCodeAt(0))
  ).buffer;

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );

  return new TextDecoder().decode(decrypted);
}
