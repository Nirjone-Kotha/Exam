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
  // Fallback for non-subtle crypto environments
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
 * Get currently authenticated user from local storage
 */
export function getCurrentUser(): AppUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Save user session locally
 */
export function setCurrentUser(user: AppUser | null): void {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_USER_KEY);
  }
}

/**
 * Sign In client helper
 */
export async function clientSignIn(identifier: string, password: string): Promise<{ success: boolean; user?: AppUser; error?: string }> {
  const { normalized, isValid } = parseIdentifier(identifier);
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

    // If server returned error, check local mock users (offline / no database)
    const localUsersRaw = localStorage.getItem("bcs_mock_users_v1");
    if (localUsersRaw) {
      const localUsers: Array<{ user: AppUser; passwordHash: string }> = JSON.parse(localUsersRaw);
      const hash = await hashPassword(password);
      const matched = localUsers.find(
        (u) => u.user.identifier.toLowerCase() === normalized.toLowerCase() && u.passwordHash === hash
      );
      if (matched) {
        setCurrentUser(matched.user);
        return { success: true, user: matched.user };
      }
    }

    return { success: false, error: data.error || "ভুল তথ্য দেওয়া হয়েছে (Invalid identifier or password)." };
  } catch {
    // Offline local check
    const localUsersRaw = localStorage.getItem("bcs_mock_users_v1");
    if (localUsersRaw) {
      const localUsers: Array<{ user: AppUser; passwordHash: string }> = JSON.parse(localUsersRaw);
      const hash = await hashPassword(password);
      const matched = localUsers.find(
        (u) => u.user.identifier.toLowerCase() === normalized.toLowerCase() && u.passwordHash === hash
      );
      if (matched) {
        setCurrentUser(matched.user);
        return { success: true, user: matched.user };
      }
    }
    return { success: false, error: "নেটওয়ার্ক সমস্যা বা অ্যাকাউন্ট খুঁজে পাওয়া যায়নি।" };
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

    // If server database not configured, save locally as fallback
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

    // Check duplicate
    if (localUsers.some((u) => u.user.identifier.toLowerCase() === normalized.toLowerCase())) {
      return { success: false, error: "এই ইমেইল বা ফোন নম্বরটি দিয়ে ইতোমধ্যে অ্যাকাউন্ট রয়েছে।" };
    }

    localUsers.push({ user: newUser, passwordHash: hash });
    localStorage.setItem("bcs_mock_users_v1", JSON.stringify(localUsers));
    setCurrentUser(newUser);

    return { success: true, user: newUser };
  } catch {
    // Offline local save
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
