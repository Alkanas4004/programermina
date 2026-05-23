/**
 * Authentication Service
 * إدارة المستخدمين والمصادقة
 */

class AuthService {
    
    // التحقق من حالة المستخدم
    static onAuthStateChanged(callback) {
        return auth.onAuthStateChanged(callback);
    }
    
    // تسجيل الدخول بجوجل
    static async signInWithGoogle() {
        try {
            const result = await auth.signInWithPopup(googleProvider);
            const user = result.user;
            
            // حفظ/تحديث بيانات المستخدم في Firestore
            await this.saveUserToFirestore(user);
            
            return { success: true, user };
        } catch(error) {
            console.error("Google sign in error:", error);
            return { success: false, error: error.message };
        }
    }
    
    // تسجيل الدخول بالبريد وكلمة المرور
    static async signInWithEmail(email, password) {
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            return { success: true, user: result.user };
        } catch(error) {
            console.error("Email sign in error:", error);
            return { success: false, error: error.message };
        }
    }
    
    // تسجيل مستخدم جديد
    static async signUp(email, password, displayName) {
        try {
            const result = await auth.createUserWithEmailAndPassword(email, password);
            await result.user.updateProfile({ displayName });
            await this.saveUserToFirestore(result.user, { displayName });
            return { success: true, user: result.user };
        } catch(error) {
            console.error("Sign up error:", error);
            return { success: false, error: error.message };
        }
    }
    
    // تسجيل الخروج
    static async signOut() {
        try {
            await auth.signOut();
            return { success: true };
        } catch(error) {
            console.error("Sign out error:", error);
            return { success: false, error: error.message };
        }
    }
    
    // حفظ بيانات المستخدم في Firestore
    static async saveUserToFirestore(user, extraData = {}) {
        const userRef = db.collection('users').doc(user.uid);
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || extraData.displayName || '',
            photoURL: user.photoURL || '',
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            role: 'user' // user, admin
        };
        
        await userRef.set(userData, { merge: true });
    }
    
    // التحقق من صلاحيات الأدمن
    static async isAdmin(userId) {
        try {
            const userDoc = await db.collection('users').doc(userId).get();
            return userDoc.exists && userDoc.data().role === 'admin';
        } catch(error) {
            console.error("Admin check error:", error);
            return false;
        }
    }
    
    // جلب بيانات المستخدم الحالي
    static getCurrentUser() {
        return auth.currentUser;
    }
}

window.AuthService = AuthService;
