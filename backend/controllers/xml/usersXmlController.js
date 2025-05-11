import fs from 'fs';
import path from 'path';
import { parseString, Builder } from 'xml2js';

const filePath = path.join('data', 'xmlData', 'users.xml');
const builder = new Builder();

// Helper to read and parse XML
const readXml = () => {
  const xml = fs.readFileSync(filePath, 'utf8');
  return new Promise((resolve, reject) => {
    parseString(xml, { explicitArray: true, explicitRoot: true }, (err, result) => {
      if (err) reject(err);
      else {
        // Ensure we have an object, not a string
        if (typeof result.users !== 'object') {
          result.users = { user: [] };
        } else if (!result.users.user) {
          result.users.user = [];
        }

        resolve(result);
      }
    });
  });
}

// Helper to write XML data
const writeXml = (data) => {
  const xml = builder.buildObject(data);
  fs.writeFileSync(filePath, xml);
};

// CREATE
export const createXmlUser = async (req, res) => {
  const { name, email } = req.body;
  console.log('Incoming data:', name, email);

  try {
    const data = await readXml();
    console.log('Parsed XML:', data);

    const users = data.users.user || [];

    const newUser = {
      id: [Date.now().toString()],
      name: [name],
      email: [email]
    };

    users.push(newUser);
    data.users.user = users;

    writeXml(data);
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    console.error('Create User Error:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};


// READ ALL
export const getAllXmlUsers = async (req, res) => {
  try {
    const data = await readXml();
    res.json(data.users.user || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load users' });
  }
};

// READ ONE
export const getXmlUserById = async (req, res) => {
  try {
    const data = await readXml();
    const user = (data.users.user || []).find(u => u.id[0] === req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// UPDATE
export const updateXmlUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const data = await readXml();
    const users = data.users.user || [];
    const userIndex = users.findIndex(u => u.id[0] === req.params.id);
    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

    if (name) users[userIndex].name = [name];
    if (email) users[userIndex].email = [email];

    writeXml(data);
    res.json({ message: 'User updated', user: users[userIndex] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// DELETE
export const deleteXmlUser = async (req, res) => {
  try {
    const data = await readXml();
    let users = data.users.user || [];
    const userIndex = users.findIndex(u => u.id[0] === req.params.id);
    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

    const deleted = users.splice(userIndex, 1);
    data.users.user = users;
    writeXml(data);
    res.json({ message: 'User deleted', user: deleted[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
