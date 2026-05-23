/**
 * Firebase Configuration File
 * ده ملف الإعدادات الخاصة بـ Firebase
 * IMPORTANT: متحطش الملف ده في الـ GitHub ابداً
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export instances (global for this project structure)
window.db = firebase.firestore();
window.auth = firebase.auth();
window.storage = firebase.storage();

// Google Provider
window.googleProvider = new firebase.auth.GoogleAuthProvider();

// Firestore settings for better performance
db.settings({ 
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
    experimentalForceLongPolling: true 
});

// Enable offline persistence
db.enablePersistence()
    .catch((err) => {
        console.warn("Offline persistence error:", err);
    });

console.log("✅ Firebase initialized successfully");
