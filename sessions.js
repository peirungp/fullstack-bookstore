import { randomUUID as uuid} from 'crypto';
import users from './users.js';

const sessions = {};

function addSession(email) {
  const sid = uuid();
  sessions[sid] = { email };
  return sid;
}

function getSessionUser(sid) {
  return sessions[sid]?.email;
}

function deleteSession(sid) {
  delete sessions[sid];
}

async function isAdmin(sid) {
  const email = sessions[sid]?.email;
  if (!email) return false;
  const user = await users.getUser(email);
  return user && user.isAdmin === 1;
}

export default {
  addSession,
  getSessionUser,
  deleteSession,
  isAdmin
};