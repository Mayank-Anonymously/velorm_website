

/**
 * Gets a persistent guest ID for the user from localStorage.
 * If one doesn't exist, it generates a new one.
 */
export const getGuestUserId = (): string => {
    if (typeof window === 'undefined') return 'server-side-guest';

    let guestId = localStorage.getItem('velorm_guest_id');

    // Check if we have an old format ID (e.g., starts with 'guest_') or no ID at all
    const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);

    if (!guestId || !isValidObjectId(guestId)) {
        // Generate a valid-looking 24-character hex string (ObjectId format)
        guestId = Array.from({ length: 24 }, () =>
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
        localStorage.setItem('velorm_guest_id', guestId);
    }
    return guestId;
};

/**
 * Returns the effective user ID for API calls. 
 * Priority: Logged in User ID > Guest ID.
 */
export const getEffectiveUserId = (authUser: any): string => {
    if (authUser && authUser._id) {
        return authUser._id;
    }
    return getGuestUserId();
};
