const { writeFile, readFile } = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contact = await listContacts();

  const result = contact.find((contact) => contact.id === contactId);

  return result || null;
};

const removeContact = async (contactId) => {
  const contact = await listContacts();

  const contactIndex = contact.findIndex((contact) => contact.id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  const [result] = contact.splice(contactIndex, 1);
  await writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return result;
};

const addContact = async (body) => {
  const contact = await listContacts();

  const newContact = { id: nanoid(), ...body };

  contact.push(newContact);

  await writeFile(contactsPath, JSON.stringify(contact, null, 2));

  return contact;
};

const updateContact = async (contactId, body) => {
  const contact = await listContacts();
  const contactIndex = contact.findIndex((contact) => contact.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  contact[contactIndex] = { contactId, ...body };
  await writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return contact[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
