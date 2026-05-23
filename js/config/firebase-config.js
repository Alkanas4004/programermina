/**
 * Firebase Configuration File
 * IMPORTANT: استبدل الإعدادات بإعدادات مشروعك الحقيقي من Firebase Console
 */

// Firebase Config - استبدلها بإعدادات مشروعك
const firebaseConfig = {
    apiKey: "AIzaSyD-YourActualKeyHere123456789",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};

// تحقق من وجود Firebase قبل التهيئة
if(typeof firebase !== 'undefined' && firebase.initializeApp) {
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    // Initialize services
    window.db = firebase.firestore();
    window.auth = firebase.auth();
    
    // Storage - علقه لو مش محتاجه أو لو بيجي خطأ
    // window.storage = firebase.storage();
    
    // Google Provider
    window.googleProvider = new firebase.auth.GoogleAuthProvider();
    
    // Firestore settings
    if(window.db) {
        db.settings({ 
            cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
        });
        
        // Enable offline persistence (مع catch للأخطاء)
        db.enablePersistence()
            .catch((err) => {
                if(err.code == 'failed-precondition') {
                    console.warn("Multiple tabs open, persistence can only be enabled in one tab at a a time.");
                } else if(err.code == 'unimplemented') {
                    console.warn("The current browser doesn't support persistence.");
                }
            });
    }
    
    console.log("✅ Firebase initialized successfully");
    
} else {
    console.warn("⚠️ Firebase not loaded, using local storage fallback");
}

// خليها سليمة عشان الأخطاء متظهرش
window.storage = window.storage || null;
