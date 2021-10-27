import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const AGENT_EMAIL = process.env.REACT_APP_AGENT_EMAIL;

const headers = {
  'api-key': API_KEY,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

const MirrorService = {
  createSession: async (reference) => {  
    const body = {
      project_id: PROJECT_ID,
      user_email: AGENT_EMAIL,
      type: "stream",
      custom: { reference } 
    };
    
    const response = await axios.post(`https://app.mirror.me/api/v1/sessions`, body, {'headers': headers});
    return response.data.session;
  },

  sendMessage: async (session_id, contact) => {
    const body = { session_id, contact };
    
    const response = await axios.post(`https://app.mirror.me/api/v1/messages`, body, {'headers': headers});
    return response.data.message;
  }
}

export default MirrorService;
