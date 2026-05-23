/**
 * Validators
 * دوال التحقق من صحة البيانات
 */

const Validators = {
    
    // التحقق من البريد الإلكتروني
    isEmail(email) {
        const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
        return emailRegex.test(email);
    },
    
    // التحقق من رقم الهاتف (مصري)
    isEgyptianPhone(phone) {
        const phoneRegex = /^(01)[0-9]{9}$/;
        return phoneRegex.test(phone);
    },
    
    // التحقق من رقم الهاتف (سعودي)
    isSaudiPhone(phone) {
        const phoneRegex = /^(05)[0-9]{8}$/;
        return phoneRegex.test(phone);
    },
    
    // التحقق من كلمة المرور (قوية)
    isStrongPassword(password) {
        // على الأقل 8 حروف، حرف كبير، حرف صغير، رقم، رمز خاص
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    },
    
    // التحقق من اسم المستخدم
    isValidUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9_\u0600-\u06FF]{3,20}$/;
        return usernameRegex.test(username);
    },
    
    // التحقق من الرابط
    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch(e) {
            return false;
        }
    },
    
    // التحقق من عدم وجود HTML tags
    hasNoHtmlTags(str) {
        return !/<[^>]*>/.test(str);
    },
    
    // التحقق من طول النص
    isLengthValid(str, min, max) {
        if(!str) return false;
        const length = str.trim().length;
        return length >= min && length <= max;
    },
    
    // التحقق من اسم المشروع
    isValidProjectTitle(title) {
        return this.isLengthValid(title, 3, 100) && this.hasNoHtmlTags(title);
    },
    
    // التحقق من وصف المشروع
    isValidProjectDescription(desc) {
        return this.isLengthValid(desc, 10, 5000) && this.hasNoHtmlTags(desc);
    },
    
    // تنظيف المدخلات من الـ XSS
    sanitizeFormData(formData) {
        const sanitized = {};
        for(const [key, value] of Object.entries(formData)) {
            sanitized[key] = Helpers.sanitizeInput(value);
        }
        return sanitized;
    }
};

window.Validators = Validators;
