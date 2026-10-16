import { useEffect } from "react";

type LCEvent = { type?: string; author?: { type?: string } };
type LCVisibility = { visibility?: string };

type LiveChatWidgetApi = {
    on: (event: string, cb: (data: never) => void) => void;
    off: (event: string, cb: (data: never) => void) => void;
    call: (method: string, ...args: unknown[]) => void;
    get: (what: string) => { visibility?: string };
};

declare global {
    interface Window {
        __lc?: Record<string, unknown>;
        LiveChatWidget?: LiveChatWidgetApi;
    }
}

const LICENSE = 19067595;
const AGENT_EVENT_TYPES = ["message", "rich_message", "file"];
const MAX_RETRIES = 10;
const FLASH_TEXT = "💬 New message!";

const injectSnippet = () => {
    if (document.getElementById("livechat-script")) return;

    window.__lc = window.__lc || {};
    window.__lc.license = LICENSE;
    window.__lc.integration_name = "manual_channels";
    window.__lc.product_name = "livechat";

    const script = document.createElement("script");
    script.id = "livechat-script";
    script.type = "text/javascript";
    script.text = `;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))`;
    document.body.appendChild(script);
};

const LiveChat = () => {
    useEffect(() => {
        injectSnippet();

        const LC = () => window.LiveChatWidget;
        if (!LC()) return;

        let pendingOpen = false;
        let titleTimer: ReturnType<typeof setInterval> | null = null;
        let savedTitle = "";
        const retryTimers = new Set<ReturnType<typeof setTimeout>>();

        const getVisibility = () => {
            try {
                return LC()?.get("state").visibility ?? null;
            } catch {
                return null;
            }
        };

        const stopTitleFlash = () => {
            if (!titleTimer) return;
            clearInterval(titleTimer);
            titleTimer = null;
            document.title = savedTitle;
        };

        const startTitleFlash = () => {
            if (titleTimer) return;
            savedTitle = document.title;
            let on = false;
            titleTimer = setInterval(() => {
                document.title = on ? savedTitle : FLASH_TEXT;
                on = !on;
            }, 1000);
        };

        const forceOpen = (attempt = 0) => {
            try {
                LC()?.call("maximize");
            } catch {
                return;
            }
            const t = setTimeout(() => {
                retryTimers.delete(t);
                if (getVisibility() === "maximized") {
                    pendingOpen = false;
                    stopTitleFlash();
                    return;
                }
                if (attempt < MAX_RETRIES) forceOpen(attempt + 1);
            }, 300);
            retryTimers.add(t);
        };

        const onNewEvent = (event: LCEvent) => {
            if (!event || !event.author || event.author.type !== "agent") return;
            if (!event.type || !AGENT_EVENT_TYPES.includes(event.type)) return;
            pendingOpen = true;
            forceOpen(0);
            if (document.hidden) startTitleFlash();
        };

        const onVisibilityChanged = (data: LCVisibility) => {
            if (data && data.visibility === "maximized") {
                pendingOpen = false;
                stopTitleFlash();
            }
        };

        const onTabVisibility = () => {
            if (!document.hidden && pendingOpen) forceOpen(0);
            else if (!document.hidden) stopTitleFlash();
        };

        LC()?.on("new_event", onNewEvent as (data: never) => void);
        LC()?.on("visibility_changed", onVisibilityChanged as (data: never) => void);
        document.addEventListener("visibilitychange", onTabVisibility);

        return () => {
            LC()?.off("new_event", onNewEvent as (data: never) => void);
            LC()?.off("visibility_changed", onVisibilityChanged as (data: never) => void);
            document.removeEventListener("visibilitychange", onTabVisibility);
            retryTimers.forEach(clearTimeout);
            retryTimers.clear();
            stopTitleFlash();
        };
    }, []);

    return null;
};

export default LiveChat;