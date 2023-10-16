import { Router } from 'express';
import { chat } from './controllers/chat';

export const router: Router = Router();

router.post('/chat', chat);

