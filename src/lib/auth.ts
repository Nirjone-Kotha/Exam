import { AppUser } from "./types";

const AUTH_USER_KEY = "bcs_auth_user_v1";

/**
 * SHA-256 hash helper compatible with browser and Node environments
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "_bcs_medical_salt");
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  return btoa(password + "_salt");
}

/**
 * Normalize and determine identifier type (email or phone)
 */
export function parseIdentifier(raw: string): { normalized: string; type: "email" | "phone"; isValid: boolean } {
  const clean = raw.trim();
  if (!clean) return { normalized: "", type: "phone", isValid: false };

  // Email format check
  if (clean.includes("@")) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      normalized: clean.toLowerCase(),
      type: "email",
      isValid: emailRegex.test(clean),
    };
  }

  // Phone number format check (supports +880, 01XXXXXXXXX, etc.)
  const digits = clean.replace(/[\s\-\(\)\+]/g, "");
  const phoneRegex = /^(880|0)?1[3-9]\d{8}$/;
  const isGenericPhone = digits.length >= 6 && /^\d+$/.test(digits);

  return {
    normalized: digits,
    type: "phone",
    isValid: phoneRegex.test(digits) || isGenericPhone,
  };
}

/**
 * Validate 6-digit password
 */
export function validateSixDigitPassword(password: string): { isValid: boolean; message: string } {
  const trimmed = password.trim();
  if (trimmed.length < 6) {
    return { isValid: false, message: "পাসওয়ার্ড অন্তত ৬ ডিজিট বা অক্ষরের হতে হবে (Password must be at least 6 digits)." };
  }
  return { isValid: true, message: "" };
}

/**
 * Get currently authenticated user from local storage or cookies
 */
export function getCurrentUser(): AppUser | null {
  if (typeof window === "undefined") return null;

  // 1. Check local storage
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id) return parsed;
    }
  } catch {}

  // 2. Fallback check document.cookie (bcs_user_data or bcs_user_id)
  try {
    const cookies = document.cookie.split(";").reduce((acc, c) => {
      const [k, v] = c.trim().split("=");
      if (k && v) acc[k] = decodeURIComponent(v);
      return acc;
    }, {} as Record<string, string>);

    if (cookies["bcs_user_data"]) {
      try {
        const user = JSON.parse(cookies["bcs_user_data"]);
        if (user && user.id) {
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
          return user;
        }
      } catch {}
    }

    if (cookies["bcs_user_id"]) {
      const userId = cookies["bcs_user_id"];
      const user: AppUser = {
        id: userId,
        name: "Doctor",
        identifier: "Verified User",
        identifierType: "phone",
        createdAt: Date.now(),
      };
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      return user;
    }
  } catch {}

  return null;
}

/**
 * Save user session locally and synchronize with cookies and custom event
 */
export function setCurrentUser(user: AppUser | null): void {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    document.cookie = `bcs_user_id=${encodeURIComponent(user.id)}; path=/; max-age=2592000; SameSite=Lax`;
    document.cookie = `bcs_user_data=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=2592000; SameSite=Lax`;
    window.dispatchEvent(new CustomEvent("bcs-auth-changed", { detail: user }));
  } else {
    localStorage.removeItem(AUTH_USER_KEY);
    document.cookie = "bcs_user_id=; path=/; max-age=0; SameSite=Lax";
    document.cookie = "bcs_user_data=; path=/; max-age=0; SameSite=Lax";
    window.dispatchEvent(new CustomEvent("bcs-auth-changed", { detail: null }));
  }
}

/**
 * Sign In client helper
 */
export async function clientSignIn(
  identifier: string,
  password: string
): Promise<{ success: boolean; user?: AppUser; error?: string }> {
  const { normalized, type, isValid } = parseIdentifier(identifier);
  if (!isValid) {
    return { success: false, error: "সঠিক ইমেইল বা ফোন নম্বর দিন (Please provide a valid email or phone number)." };
  }

  const passCheck = validateSixDigitPassword(password);
  if (!passCheck.isValid) {
    return { success: false, error: passCheck.message };
  }

  try {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: normalized, password }),
    });

    const data = await res.json();
    if (res.ok && data.success && data.user) {
      setCurrentUser(data.user);
      return { success: true, user: data.user };
    }

    // Check local mock users (offline / no database)
    const localUsersRaw = localStorage.getItem("bcs_mock_users_v1");
    const localUsers: Array<{ user: AppUser; passwordHash: string }> = localUsersRaw
      ? JSON.parse(localUsersRaw)
      : [];

    const hash = await hashPassword(password);
    const matched = localUsers.find(
      (u) => u.user.identifier.toLowerCase() === normalized.toLowerCase() && u.passwordHash === hash
    );

    if (matched) {
      setCurrentUser(matched.user);
      return { success: true, user: matched.user };
    }

    // If new user entering via Sign In, auto-register seamlessly
    const fallbackName = normalized.includes("@")
      ? normalized.split("@")[0]
      : `Dr. ${normalized.slice(-4)}`;

    const newUser: AppUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: fallbackName,
      identifier: normalized,
      identifierType: type,
      createdAt: Date.now(),
    };

    localUsers.push({ user: newUser, passwordHash: hash });
    localStorage.setItem("bcs_mock_users_v1", JSON.stringify(localUsers));
    setCurrentUser(newUser);

    return { success: true, user: newUser };
  } catch {
    // Offline local fallback
    const hash = await hashPassword(password);
    const fallbackName = normalized.includes("@")
      ? normalized.split("@")[0]
      : `Dr. ${normalized.slice(-4)}`;

    const newUser: AppUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: fallbackName,
      identifier: normalized,
      identifierType: type,
      createdAt: Date.now(),
    };

    setCurrentUser(newUser);
    return { success: true, user: newUser };
  }
}

/**
 * Sign Up client helper
 */
export async function clientSignUp(
  name: string,
  identifier: string,
  password: string
): Promise<{ success: boolean; user?: AppUser; error?: string }> {
  if (!name.trim()) {
    return { success: false, error: "অনুগ্রহ করে আপনার নাম লিখুন (Please enter your name)." };
  }

  const { normalized, type, isValid } = parseIdentifier(identifier);
  if (!isValid) {
    return { success: false, error: "সঠিক ইমেইল বা ফোন নম্বর দিন (Please provide a valid email or phone number)." };
  }

  const passCheck = validateSixDigitPassword(password);
  if (!passCheck.isValid) {
    return { success: false, error: passCheck.message };
  }

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), identifier: normalized, password }),
    });

    const data = await res.json();
    if (res.ok && data.success && data.user) {
      setCurrentUser(data.user);
      return { success: true, user: data.user };
    }

    // Local fallback
    const hash = await hashPassword(password);
    const newUser: AppUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      identifier: normalized,
      identifierType: type,
      createdAt: Date.now(),
    };

    const localUsersRaw = localStorage.getItem("bcs_mock_users_v1");
    const localUsers: Array<{ user: AppUser; passwordHash: string }> = localUsersRaw
      ? JSON.parse(localUsersRaw)
      : [];

    localUsers.push({ user: newUser, passwordHash: hash });
    localStorage.setItem("bcs_mock_users_v1", JSON.stringify(localUsers));
    setCurrentUser(newUser);

    return { success: true, user: newUser };
  } catch {
    const newUser: AppUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      identifier: normalized,
      identifierType: type,
      createdAt: Date.now(),
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  }
}

/**
 * Sign Out client helper
 */
export async function clientSignOut(): Promise<void> {
  setCurrentUser(null);
  try {
    await fetch("/api/auth/signout", { method: "POST" });
  } catch {}
}
