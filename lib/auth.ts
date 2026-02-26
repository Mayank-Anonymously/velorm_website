

/**
 * Gets a persistent guest ID for the user from localStorage.
 * If one doesn't exist, it generates a new one.
 */
export const getGuestUserId = (): string => {
    if (typeof window === 'undefined') return 'server-side-guest';

    let guestId = localStorage.getItem('velorm_guest_id');
    if (!guestId) {
        guestId = `guest_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
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
