/**
 * Messages Service
 * إدارة الرسائل من نموذج الاتصال
 */

class MessagesService {
    
    // إرسال رسالة جديدة
    static async sendMessage(messageData) {
        try {
            const sanitizedData = {
                name: Helpers.sanitizeInput(messageData.name),
                email: Helpers.sanitizeInput(messageData.email),
                message: Helpers.sanitizeInput(messageData.message),
                status: 'unread',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                ip: await this.getUserIP()
            };
            
            const docRef = await db.collection('messages').add(sanitizedData);
            return { success: true, id: docRef.id };
        } catch(error) {
            console.error("Error sending message:", error);
            throw error;
        }
    }
    
    // جلب كل الرسائل (للأدمن فقط)
    static async getAllMessages() {
        try {
            const snapshot = await db.collection('messages')
                .orderBy('createdAt', 'desc')
                .get();
            
            const messages = [];
            snapshot.forEach(doc => {
                messages.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return messages;
        } catch(error) {
            console.error("Error fetching messages:", error);
            throw error;
        }
    }
    
    // جلب الرسائل غير المقروءة
    static async getUnreadMessages() {
        try {
            const snapshot = await db.collection('messages')
                .where('status', '==', 'unread')
                .orderBy('createdAt', 'desc')
                .get();
            
            const messages = [];
            snapshot.forEach(doc => {
                messages.push({ id: doc.id, ...doc.data() });
            });
            return messages;
        } catch(error) {
            console.error("Error fetching unread messages:", error);
            throw error;
        }
    }
    
    // تحديث حالة الرسالة (قرأت/غير مقروء)
    static async markAsRead(messageId) {
        try {
            await db.collection('messages').doc(messageId).update({
                status: 'read',
                readAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return true;
        } catch(error) {
            console.error("Error marking message as read:", error);
            throw error;
        }
    }
    
    // حذف رسالة
    static async deleteMessage(messageId) {
        try {
            await db.collection('messages').doc(messageId).delete();
            return true;
        } catch(error) {
            console.error("Error deleting message:", error);
            throw error;
        }
    }
    
    // حذف كل الرسائل
    static async deleteAllMessages() {
        try {
            const snapshot = await db.collection('messages').get();
            const batch = db.batch();
            snapshot.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            return true;
        } catch(error) {
            console.error("Error deleting all messages:", error);
            throw error;
        }
    }
    
    // جلب عنوان IP للمستخدم (للحماية)
    static async getUserIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch(e) {
            return 'unknown';
        }
    }
    
    // عدد الرسائل غير المقروءة
    static async getUnreadCount() {
        try {
            const snapshot = await db.collection('messages')
                .where('status', '==', 'unread')
                .get();
            return snapshot.size;
        } catch(error) {
            console.error("Error getting unread count:", error);
            return 0;
        }
    }
}

window.MessagesService = MessagesService;
