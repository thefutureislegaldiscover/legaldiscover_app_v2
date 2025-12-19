import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID

// GET /User
export const getUserInfo = async (token: string, id: string) => {
    try {
        const res = await axios.get(`${API_BASE}/tenants/${TENANT_ID}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        throw err;
    }
};

// POST /storage
export const uploadFile = async (uploadFile: any, token: string) => {
    try {
        const res = await axios.post(`${API_BASE}/tenants/${TENANT_ID}/storage`, uploadFile, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        throw err;
    }
};

// get /storage  
export const getFile = async (data: any, token: string) => {
    try {
        const res = await axios.get(`${API_BASE}/tenants/${TENANT_ID}/storage`, {
            params: data,  
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        throw err;
    }
};

// GET /matters
export const getMatterById = async (token: string, id: string) => {
    try {
        const res = await axios.get(`${API_BASE}/tenants/${TENANT_ID}/matters/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        throw err;
    }
};

// GET /matters  
export const getAllMatters = async (token: string) => {
    try {
        const res = await axios.get(`${API_BASE}/tenants/${TENANT_ID}/matters`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        throw err;
    }
};

// POST /matters
export const createMatter = async (matter: any, token: string) => {
    try {
        const res = await axios.post(`${API_BASE}/tenants/${TENANT_ID}/matters`, matter, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        throw err;
    }
};

// PUT /matters
export const updateMatter = async (id: string) => {
    try {
        const res = await axios.put(`${API_BASE}/tenants/${TENANT_ID}/matters/${id}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

interface SendAIMessagePayload {
    message: string;
    userId: string;
}

export const sendMssagetoaskAI = async (
    data: SendAIMessagePayload,
    token: string
) => {
    const res = await axios.post(
        `${API_BASE}/tenants/${TENANT_ID}/publicai/send`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
    return res.data;
};

export const getAIConversation = async (token: string, userID: string) => {
    const res = await axios.get(`${API_BASE}/tenants/${TENANT_ID}/publicai/conversations?userId=${userID}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
    return res.data;
};
