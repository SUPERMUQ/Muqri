export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: string;
}

const contactMessages: ContactMessage[] = [];

export class ContactService {
  public static async submitMessage(data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      ...data,
      timestamp: new Date().toISOString(),
    };
    contactMessages.push(newMessage);
    return newMessage;
  }

  public static async getMessages(): Promise<ContactMessage[]> {
    return contactMessages;
  }
}
