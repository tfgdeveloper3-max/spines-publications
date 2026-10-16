export type LegalListItem = { label?: string; text: string };

export type LegalBlock = string | { list: LegalListItem[] };

export type LegalSection = { id: string; title: string; body: LegalBlock[] };

export type LegalDoc = {
    badge: string;
    titleBefore: string;
    titleAccent: string;
    intro: string;
    updated: string;
    sections: LegalSection[];
};

export const COMPANY = "Spine Publications";
export const CONTACT_EMAIL = "support@spinepublications.com";
export const CONTACT_PHONE = "(728) 221-6606";
export const CONTACT_PHONE_HREF = "tel:+17282216606";
export const CONTACT_ADDRESS = "4781 N Congress Ave, Boynton Beach, FL 33426";

export const terms: LegalDoc = {
    badge: "Legal",
    titleBefore: "Terms &",
    titleAccent: "Conditions",
    intro:
        "Please read these terms carefully before placing an order. They explain how Spine Publications works with you, what you can expect from us, and your rights over the work we create together.",
    updated: "October 17, 2026",
    sections: [
        {
            id: "agreement",
            title: "Agreement to These Terms",
            body: [
                `When you complete an order with us, i.e. you make the payment, you are considered to have read, understood, and agreed to the terms and conditions listed on this page. These terms are a legal contract between the client and ${COMPANY}. By ordering and using the services of ${COMPANY}, you agree to be bound by the following terms.`,
            ],
        },
        {
            id: "original-content",
            title: "We Deliver Original Content Only",
            body: [
                "We guarantee plagiarism-free work. To confirm that written content we create for you (such as ghostwritten manuscripts, book descriptions, and marketing copy) is original, we provide a Copyscape report on request.",
                "Note: Text contained in images, videos, cover artwork, or other media that search engines cannot read will not be scanned by Copyscape. You may choose to run more comprehensive plagiarism checks yourself, as these are not included in our standard pricing.",
                `You can be confident in the originality of the work you receive from ${COMPANY}.`,
            ],
        },
        {
            id: "information-use",
            title: "How We Use Your Information",
            body: [
                {
                    list: [
                        { label: "To personalize your experience", text: "your information helps us better understand and respond to your individual publishing needs." },
                        { label: "To improve our website", text: "we continually work to improve our website based on the information and feedback we receive from you." },
                        { label: "To improve customer service", text: "your information helps us respond effectively to your customer service requests and support needs." },
                        {
                            label: "To process transactions",
                            text: "your information, whether public or private, will not be sold, exchanged, transferred, or given to any other company for any reason without your consent, other than for the express purpose of delivering the product or service you purchased, such as distributing your book to retailers.",
                        },
                        { label: "To send periodic emails", text: "the email address you provide may be used to send you project updates, respond to inquiries, and answer other requests or questions." },
                    ],
                },
            ],
        },
        {
            id: "ownership",
            title: "You Retain Complete Ownership",
            body: [
                "Every order you place and pay for becomes your property once it is delivered to you, including your manuscript, edited files, cover design, and interior layout. We do not require any acknowledgment or credit for our work.",
                "With every completed order, you receive full ownership of the content, may publish it under your own name, and may use it in any way you wish. You keep 100% of the rights to your book.",
            ],
        },
        {
            id: "data-protection",
            title: "How We Protect Your Information",
            body: [
                "From the moment you place an order or submit any personal information, we apply security measures at every level to keep your information safe. We use SSL encryption to protect the security and confidentiality of all information you share with us.",
                "After a transaction is complete, we do not store your sensitive financial information (such as credit card numbers, social security numbers, or banking details) in our database.",
            ],
        },
        {
            id: "cookies",
            title: "Why We Use Cookies",
            body: [
                "We use cookies to track advertisements and compile aggregate data about site traffic and interactions, which helps us offer a better website experience and better tools.",
                "We may work with third-party services to help us understand visitor behavior. These third parties may use the collected information only for the purpose of analyzing site usage on our behalf.",
            ],
        },
        {
            id: "images",
            title: "Our Policy for Using Images",
            body: [
                "We are committed to respecting copyright and maintaining our credibility with clients and the market. We do not use copyrighted images without the proper rights.",
                "For your book cover and interior, our designers create original artwork or use properly licensed or royalty-free images. If you would like to use a specific copyrighted image, we can share links to recommended options, but you may need to obtain permission from, or pay, the copyright owner(s) yourself.",
            ],
        },
        {
            id: "liability",
            title: "Limitation of Liability",
            body: [
                `Please read this clause carefully. ${COMPANY} shall not be liable for any direct or indirect loss claimed by a customer to have resulted from the use of our website or of services and products purchased through our website.`,
                `This disclaimer also applies to any viruses allegedly obtained through our website or products that may have caused material or reputational loss. In no event shall ${COMPANY} be liable for any loss resulting from the use of, or inability to use, our website or products.`,
            ],
        },
        {
            id: "updates",
            title: "Updates to Our Policies",
            body: ["These terms are subject to change, so please visit this page from time to time to check for updates. Changes may be made without prior notice."],
        },
    ],
};

export const privacy: LegalDoc = {
    badge: "Legal",
    titleBefore: "Privacy",
    titleAccent: "Policy",
    intro:
        "Your trust matters to us. This policy explains what information Spine Publications collects, how we use it, and the steps we take to keep it safe.",
    updated: "October 17, 2026",
    sections: [
        {
            id: "information-we-collect",
            title: "What Information Do We Collect?",
            body: [
                "We collect information from you when you register on our site, place an order, subscribe to our newsletter, request a quote, or fill out a form.",
                "When ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, mailing address, phone number, or credit card information. You may, however, visit our site anonymously.",
            ],
        },
        {
            id: "how-we-use",
            title: "What Do We Use Your Information For?",
            body: [
                "The information we collect from you may be used in one of the following ways:",
                {
                    list: [
                        { label: "To personalize your experience", text: "your information helps us better respond to your individual publishing needs." },
                        { label: "To improve our website", text: "we continually strive to improve our website offerings based on the information and feedback we receive from you." },
                        { label: "To improve customer service", text: "your information helps us respond effectively to your customer service requests and support needs." },
                        {
                            label: "To process transactions",
                            text: "your information, whether public or private, will not be sold, exchanged, transferred, or given to any other company for any reason whatsoever without your consent, other than for the express purpose of delivering the purchased product or service requested.",
                        },
                        { label: "To send periodic emails", text: "the email address you provide may be used to send you project updates, respond to inquiries, and answer other requests or questions." },
                    ],
                },
            ],
        },
        {
            id: "protection",
            title: "How Do We Protect Your Information?",
            body: [
                "We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.",
                "We offer the use of a secure server. All sensitive and payment information you supply is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our payment gateway provider's database. It is accessible only to those authorized with special access rights to such systems, who are required to keep the information confidential.",
                "After a transaction, your private information (credit cards, social security numbers, financials, etc.) will not be stored on our servers.",
            ],
        },
        {
            id: "cookies",
            title: "Do We Use Cookies?",
            body: [
                "Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser (if you allow) that enable the site's or service provider's systems to recognize your browser and capture and remember certain information.",
                "We use cookies to keep track of advertisements and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future. We may contract with third-party service providers to assist us in better understanding our site visitors. These service providers are not permitted to use the information collected on our behalf except to help us conduct and improve our business.",
            ],
        },
        {
            id: "disclosure",
            title: "Do We Disclose Any Information to Outside Parties?",
            body: [
                "We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, such as printing and distribution partners, so long as those parties agree to keep this information confidential.",
                "We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect our or others' rights, property, or safety. However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.",
            ],
        },
        {
            id: "third-party-links",
            title: "Third-Party Links",
            body: [
                "Occasionally, at our discretion, we may include or offer third-party products or services on our website, such as links to online bookstores where your book is sold. These third-party sites have separate and independent privacy policies.",
                "We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.",
            ],
        },
        {
            id: "online-only",
            title: "Online Privacy Policy Only",
            body: ["This online privacy policy applies only to information collected through our website and not to information collected offline."],
        },
    ],
};