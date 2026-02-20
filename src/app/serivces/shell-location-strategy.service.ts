import { Injectable, Inject, Optional } from '@angular/core';
import { LocationStrategy, PathLocationStrategy, PlatformLocation, APP_BASE_HREF } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ShellLocationStrategyService extends PathLocationStrategy {
    private _internalUrl: string | null = null;

    constructor(
        private platformLocation: PlatformLocation,
        @Optional() @Inject(APP_BASE_HREF) href?: string
    ) {
        super(platformLocation, href);

        // Initialize: Capture the full URL as the internal state
        const currentPath = this.platformLocation.pathname + this.platformLocation.search;
        this._internalUrl = currentPath;

        // Initial Masking: If we loaded a deep URL from server/bookmark, mask it immediately
        const masked = this.getMaskedUrl(currentPath);
        if (this.platformLocation.pathname !== masked.split('?')[0]) {
            this.platformLocation.replaceState(null, '', masked);
        }
    }

    override onPopState(fn: (value: any) => void): void {
        this.platformLocation.onPopState((event: any) => {
            // When back button is pressed, recover the internal URL from the state
            const state = event.state as { internalUrl?: string };
            if (state && state.internalUrl) {
                this._internalUrl = state.internalUrl;
            } else {
                // Fallback: If no state, we must rely on the physical URL (which might be masked or external)
                this._internalUrl = this.platformLocation.pathname + this.platformLocation.search;
            }
            fn(event);
        });
    }

    override path(includeHash?: boolean): string {
        // Angular Router calls this to know "Where am I?"
        // We MUST tell it the full internal URL (e.g. /lms/employee), NOT the masked URL (e.g. /lms)

        // Priority 1: The in-memory tracker (most accurate during app usage)
        if (this._internalUrl) {
            return this._internalUrl;
        }

        // Priority 2: The history state (accurate after reload)
        const state = this.platformLocation.getState() as { internalUrl?: string };
        if (state && state.internalUrl) {
            this._internalUrl = state.internalUrl;
            return state.internalUrl;
        }

        // Priority 3: The physical URL (Startups, External links)
        return this.platformLocation.pathname + this.platformLocation.search;
    }

    override pushState(state: any, title: string, url: string, queryParams: string): void {
        const internalFullUrl = queryParams.length > 0 ? `${url}?${queryParams}` : url;

        // 1. Update Internal Memory
        this._internalUrl = internalFullUrl;

        // 2. Determine Masked URL for Browser
        const visibleUrl = this.getMaskedUrl(internalFullUrl);

        // 3. Save internal URL in History State (for Back button)
        const newState = { ...state, internalUrl: internalFullUrl };

        // 4. Push to Browser History
        this.platformLocation.pushState(newState, title, visibleUrl);
    }

    override replaceState(state: any, title: string, url: string, queryParams: string): void {
        const internalFullUrl = queryParams.length > 0 ? `${url}?${queryParams}` : url;

        this._internalUrl = internalFullUrl;

        const visibleUrl = this.getMaskedUrl(internalFullUrl);
        const newState = { ...state, internalUrl: internalFullUrl };

        this.platformLocation.replaceState(newState, title, visibleUrl);
    }

    override prepareExternalUrl(internal: string): string {
        return internal;
    }

    private getMaskedUrl(url: string): string {
        // Determine the base app route
        const path = url.split('?')[0];
        if (path.startsWith('/rrf')) return '/rrf';
        if (path.startsWith('/lms')) return '/lms';
        // Add others as needed
        return url;
    }
}
