import express from 'express';
import {
    getUserProfile,
    updateProfile,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
} from '../controllers/user.controller.js';
import { protect } from '../middleware/authMiddleware.js';
import validate from '../middleware/validate.js';
import { updateProfileValidator } from '../validators/user.validators.js';

const router = express.Router();

// Static/protected routes — must be registered before dynamic /:username
// to prevent Express from matching 'profile' as a username param
router.put('/profile', protect, validate(updateProfileValidator), updateProfile);

// Public dynamic routes
router.get('/:username', getUserProfile);
router.get('/:username/followers', getFollowers);
router.get('/:username/following', getFollowing);

// Protected dynamic routes
router.post('/:username/follow', protect, followUser);
router.delete('/:username/follow', protect, unfollowUser);

export default router;