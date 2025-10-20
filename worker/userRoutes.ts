import { Hono } from "hono";
import { getAgentByName } from 'agents';
import { ChatAgent } from './agent';
import { API_RESPONSES } from './config';
import { Env, getAppController, registerSession, unregisterSession } from "./core-utils";
import { delay } from "./utils";
/**
 * DO NOT MODIFY THIS FUNCTION. Only for your reference.
 */
export function coreRoutes(app: Hono<{ Bindings: Env }>) {
    // Use this API for conversations. **DO NOT MODIFY**
    app.all('/api/chat/:sessionId/*', async (c) => {
        try {
        const sessionId = c.req.param('sessionId');
        const agent = await getAgentByName<Env, ChatAgent>(c.env.CHAT_AGENT, sessionId); // Get existing agent or create a new one if it doesn't exist, with sessionId as the name
        const url = new URL(c.req.url);
        url.pathname = url.pathname.replace(`/api/chat/${sessionId}`, '');
        return agent.fetch(new Request(url.toString(), {
            method: c.req.method,
            headers: c.req.header(),
            body: c.req.method === 'GET' || c.req.method === 'DELETE' ? undefined : c.req.raw.body
        }));
        } catch (error) {
        console.error('Agent routing error:', error);
        return c.json({
            success: false,
            error: API_RESPONSES.AGENT_ROUTING_FAILED
        }, { status: 500 });
        }
    });
}
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    // Mock Authentication Routes
    app.post('/api/auth/signup', async (c) => {
        const { email, password } = await c.req.json();
        if (!email || !password) {
            return c.json({ success: false, error: 'Email and password are required' }, 400);
        }
        // In a real app, you'd save the user here.
        return c.json({ success: true, message: 'User created successfully' });
    });
    app.post('/api/auth/login', async (c) => {
        const { email, password } = await c.req.json();
        if (email === 'demo@stellarframe.io' && password === 'password123') {
            // Mock JWT
            const token = `mock-jwt-token-for-${email}-${Date.now()}`;
            return c.json({ success: true, token });
        }
        return c.json({ success: false, error: 'Invalid credentials' }, 401);
    });
    // Mock Video Generation Route
    app.post('/api/video/generate', async (c) => {
        const authHeader = c.req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer mock-jwt-token-for-')) {
            return c.json({ success: false, error: 'Unauthorized' }, 401);
        }
        const { prompt, aspectRatio } = await c.req.json();
        if (!prompt) {
            return c.json({ success: false, error: 'Prompt is required' }, 400);
        }
        // Simulate a 5-10 second delay
        await delay(Math.random() * 5000 + 5000);
        const [width, height] = aspectRatio ? aspectRatio.split(':').map(Number) : [16, 9];
        const videoUrl = `https://placehold.co/${width*100}x${height*100}/274275/f5f5f5/mp4?text=Video for:\n${encodeURIComponent(prompt.slice(0, 50))}`;
        return c.json({ success: true, url: videoUrl });
    });

}