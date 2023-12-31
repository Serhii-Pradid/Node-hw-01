import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const updateContactsStorage = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const getAllContacts = async () => {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data);
}
export const getContactById = async(contactId) => {
    const contacts = await getAllContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
  }
  
  export const removeContact = async(contactId) => {
   
  const contacts = await getAllContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if(index === -1){
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContactsStorage(contacts);
  return result;
}
  
export const addContact = async({ name, email, phone }) => {
    
    const contacts = await getAllContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    await updateContactsStorage(contacts);
    return newContact;
  }

export default {
    getAllContacts,
    getContactById,
    removeContact,
    addContact
}