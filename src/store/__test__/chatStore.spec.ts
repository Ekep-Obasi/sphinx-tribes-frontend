import { ChatHistoryStore } from '../chat';
import { Chat } from '../interface';

describe('ChatHistoryStore', () => {
  let store: ChatHistoryStore;

  beforeEach(() => {
    store = new ChatHistoryStore();
  });

  describe('getChat', () => {
    const mockChat: Chat = {
      id: 'chat123',
      workspaceId: 'workspace123',
      title: 'Test Chat',
      createdAt: '2024-03-20T10:00:00Z',
      updatedAt: '2024-03-20T10:00:00Z'
    };

    it('should return chat when valid ID exists', () => {
      store.addChat(mockChat);
      const result = store.getChat('chat123');
      expect(result).toEqual(mockChat);
    });

    it('should return undefined for non-existing chat ID', () => {
      const result = store.getChat('nonexistent123');
      expect(result).toBeUndefined();
    });

    it('should return undefined for empty string ID', () => {
      const result = store.getChat('');
      expect(result).toBeUndefined();
    });

    it('should handle IDs with special characters', () => {
      const specialChat: Chat = {
        ...mockChat,
        id: 'chat!@#$%^&*()'
      };
      store.addChat(specialChat);
      const result = store.getChat('chat!@#$%^&*()');
      expect(result).toEqual(specialChat);
    });

    it('should handle IDs with maximum length', () => {
      const longId = 'a'.repeat(256);
      const longChat: Chat = {
        ...mockChat,
        id: longId
      };
      store.addChat(longChat);
      const result = store.getChat(longId);
      expect(result).toEqual(longChat);
    });

    it('should be case sensitive when retrieving chats', () => {
      store.addChat(mockChat);
      const result = store.getChat('CHAT123');
      expect(result).toBeUndefined();
    });

    it('should handle IDs with leading/trailing whitespace', () => {
      const result = store.getChat('  chat123  ');
      expect(result).toBeUndefined();

      store.addChat(mockChat);
      const validResult = store.getChat('chat123');
      expect(validResult).toEqual(mockChat);
    });

    it('should handle IDs with internal whitespace', () => {
      const spaceChat: Chat = {
        ...mockChat,
        id: 'chat 123'
      };
      store.addChat(spaceChat);
      const result = store.getChat('chat 123');
      expect(result).toEqual(spaceChat);
    });

    it('should handle IDs with unicode characters', () => {
      const unicodeChat: Chat = {
        ...mockChat,
        id: 'chat🚀你好'
      };
      store.addChat(unicodeChat);
      const result = store.getChat('chat🚀你好');
      expect(result).toEqual(unicodeChat);
    });

    it('should correctly manage multiple chats', () => {
      const chat1 = { ...mockChat, id: 'chat1' };
      const chat2 = { ...mockChat, id: 'chat2' };

      store.addChat(chat1);
      store.addChat(chat2);

      expect(store.getChat('chat1')).toEqual(chat1);
      expect(store.getChat('chat2')).toEqual(chat2);
    });

    it('should return updated chat after modification', () => {
      store.addChat(mockChat);
      store.updateChat('chat123', { title: 'Updated Title' });

      const result = store.getChat('chat123');
      expect(result?.title).toBe('Updated Title');
    });
  });
});
