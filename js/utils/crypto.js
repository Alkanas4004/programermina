/**
 * Crypto Utilities
 * دوال التشفير والحماية المتقدمة
 */

class CryptoUtils {
    
    // تشفير بسيط (XOR + Base64)
    static simpleEncode(data) {
        if(!data) return '';
        let encoded = '';
        for(let i = 0; i < data.length; i++) {
            encoded += String.fromCharCode(data.charCodeAt(i) ^ 0x2A);
        }
        return btoa(encoded);
    }
    
    // فك التشفير
    static simpleDecode(encodedData) {
        try {
            let decoded = atob(encodedData);
            let original = '';
            for(let i = 0; i < decoded.length; i++) {
                original += String.fromCharCode(decoded.charCodeAt(i) ^ 0x2A);
            }
            return original;
        } catch(e) {
            return '';
        }
    }
    
    // تشفير متقدم (AES-like بسيط)
    static advancedEncode(data, key = 'NEXUS_SECRET_2025') {
        let result = '';
        for(let i = 0; i < data.length; i++) {
            const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode);
        }
        return btoa(result);
    }
    
    // فك التشفير المتقدم
    static advancedDecode(encodedData, key = 'NEXUS_SECRET_2025') {
        try {
            const data = atob(encodedData);
            let result = '';
            for(let i = 0; i < data.length; i++) {
                const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length);
                result += String.fromCharCode(charCode);
            }
            return result;
        } catch(e) {
            return '';
        }
    }
    
    // إنشاء Token عشوائي
    static generateToken(length = 32) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for(let i = 0; i < length; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return token;
    }
    
    // Hash بسيط للنصوص
    static simpleHash(str) {
        let hash = 0;
        for(let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return Math.abs(hash).toString(16);
    }
    
    // تشفير بيانات LocalStorage
    static secureStorageSet(key, value) {
        const encrypted = this.advancedEncode(JSON.stringify(value));
        localStorage.setItem(`secure_${key}`, encrypted);
    }
    
    // فك تشفير بيانات LocalStorage
    static secureStorageGet(key) {
        const encrypted = localStorage.getItem(`secure_${key}`);
        if(!encrypted) return null;
        try {
            const decrypted = this.advancedDecode(encrypted);
            return JSON.parse(decrypted);
        } catch(e) {
            return null;
        }
    }
    
    // حماية كلمة المرور (تشفير قبل الإرسال)
    static hashPassword(password) {
        // محاكاة تشفير - في الحقيقة المفروض يكون من后端
        return btoa(password + 'NEXUS_SALT');
    }
}

window.CryptoUtils = CryptoUtils;
