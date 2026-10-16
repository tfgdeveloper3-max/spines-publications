const LEAD_ENDPOINT = "https://leads.authorpublishers.us/api/lead/Ao8NYQ5I6KVUfMUwTalpGZjAeBkJjQom";

export type LeadInput = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

export const submitLead = async (lead: LeadInput) => {
    let res: Response;

    try {
        res = await fetch(LEAD_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: lead.name.trim(),
                email: lead.email.trim(),
                phone_number: lead.phone.trim(),
                message: lead.message.trim(),
            }),
        });
    } catch {
        throw new Error("We couldn't reach our server. Please check your connection and try again.");
    }

    let data: unknown = null;
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (!res.ok) {
        const message =
            data && typeof data === "object" && "message" in data && typeof (data as { message: unknown }).message === "string"
                ? (data as { message: string }).message
                : "Something went wrong. Please try again.";
        throw new Error(message);
    }

    return data;
};