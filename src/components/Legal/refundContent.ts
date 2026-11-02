import { COMPANY, type LegalDoc } from "./Legalcontent";

export const refund: LegalDoc = {
    badge: "Legal",
    titleBefore: "Refund &",
    titleAccent: "Cancellation Policy",
    intro:
        "This policy explains when refunds are available, how project cancellations work, and how Spine Publications reviews and processes refund requests.",
    preface: [
        `This Refund and Cancellation Policy (“Policy”) outlines the terms governing refund applications, project cancellations, and related payment matters for publishing, editorial, production, marketing, and other services provided by ${COMPANY} (“Company,” “we,” “us,” or “our”).`,
        "By ordering, purchasing, or otherwise engaging our services, the customer (“Client,” “you,” or “your”) confirms that they have had the opportunity to review this Policy and understand its provisions. All terms remain subject to applicable laws, consumer protections, and the relevant service agreement.",
    ],
    sections: [
        {
            id: "general-refund-conditions",
            title: "General Refund Conditions",
            body: [
                { clause: "1.1", text: `Every payment made to ${COMPANY} is governed by this Policy and the terms outlined in the applicable service agreement.` },
                { clause: "1.2", text: "Refund eligibility will be assessed by considering the reason for cancellation, the time passed since the project officially began, the progress and completion status of the services, and any costs or commitments already undertaken by the Company." },
                { clause: "1.3", text: "A refund may be reviewed or granted in circumstances such as:" },
                {
                    list: [
                        { text: "The Client requests cancellation before the Company begins providing the agreed services, subject to the cancellation provisions of this Policy." },
                        { text: "The Company is unable to deliver services specifically included in the applicable service agreement." },
                        { text: "A payment has been charged more than once or processed incorrectly." },
                        { text: "A refund is required under the service agreement or applicable legal requirements." },
                    ],
                },
                { clause: "1.4", text: "Each refund application will be evaluated individually, taking into account the circumstances of the request, this Policy, and any relevant legal obligations." },
            ],
        },
        {
            id: "change-of-mind-cancellations",
            title: "Change-of-Mind Cancellations",
            body: [
                { clause: "2.1", text: "A change-of-mind cancellation occurs when a Client voluntarily decides to discontinue a project for personal reasons or circumstances that are not connected to the Company's failure to fulfill its agreed responsibilities." },
                { clause: "2.2", text: "The following refund conditions apply to such requests:" },
                { sub: "2.2.1 Cancellation Within the First Twenty-Four (24) Hours" },
                "If the Client submits a written cancellation request within twenty-four (24) hours of the officially recorded project onboarding date and time, the Client will qualify for a refund equal to thirty percent (30%) of the total payment received by the Company for that project.",
                "The remaining seventy percent (70%) will be retained by the Company as a cancellation fee, subject to applicable law and the relevant service agreement.",
                "Any taxes, mandatory statutory deductions, or other legally required adjustments may be deducted from the refundable amount before it is issued, where such deductions are permitted by law.",
                { sub: "2.2.2 Cancellation After the Initial Twenty-Four (24) Hours" },
                "If a Client requests cancellation for personal reasons after the initial twenty-four (24)-hour period has passed, the project will generally be considered non-refundable on the basis of a change of mind alone.",
                "In such cases, the Company will not be contractually required to provide a refund solely because the Client chooses to discontinue the project. This condition remains subject to applicable consumer protection legislation, statutory refund entitlements, and any obligations arising under the relevant service agreement.",
                { clause: "2.3", text: "The twenty-four (24)-hour cancellation period begins at the official project onboarding date and time documented or communicated to the Client by the Company." },
                { clause: "2.4", text: "These change-of-mind provisions do not affect a Client's right to seek an appropriate remedy where the Company has materially breached its obligations, failed to provide the agreed services, or is otherwise required to issue a refund under applicable law." },
            ],
        },
        {
            id: "completed-services",
            title: "Completed Services and Non-Refundable Work",
            body: [
                { clause: "3.1", text: "To the extent permitted by applicable law and the relevant service agreement, payments relating to work that has already been completed, delivered, or approved by the Client will generally not qualify for a refund." },
                { clause: "3.2", text: "This may include, but is not limited to, the following services:" },
                {
                    list: [
                        { text: "Manuscript development, writing, editing, proofreading, and other editorial work that has already been performed or supplied." },
                        { text: "Book formatting, typesetting, interior page arrangement, and layout design that have been completed." },
                        { text: "Customized book covers, illustrations, graphic designs, and other creative materials that have been developed or approved." },
                        { text: "Audiobook-related work, including narration, voice recording, audio editing, and completed production activities." },
                        { text: "Promotional campaigns, marketing services, advertising placements, and related expenditures that have already been undertaken." },
                        { text: "ISBN registration, publishing arrangements, distribution setup, printing orders, and third-party services involving financial commitments already made." },
                    ],
                },
                { clause: "3.3", text: "The fact that completed work is generally non-refundable does not remove or limit any legal rights or remedies that may be available to the Client under applicable law." },
            ],
        },
        {
            id: "undelivered-services",
            title: "Delayed, Partially Completed, or Undelivered Services",
            body: [
                { clause: "4.1", text: "If the Company is unable to provide an agreed service because of circumstances within its reasonable control, the matter will be reviewed in accordance with the applicable service agreement and the circumstances surrounding the delay or non-delivery." },
                { clause: "4.2", text: "Depending on the nature of the issue, a suitable resolution may involve:" },
                {
                    list: [
                        { text: "Completing and supplying the outstanding work." },
                        { text: "Providing an alternative service or making an adjustment mutually accepted by the Company and the Client." },
                        { text: "Issuing a partial or full refund for the portion of the services that remains undelivered, where justified and appropriate." },
                    ],
                },
                { clause: "4.3", text: "Refunds considered under this section will be assessed separately from the change-of-mind cancellation rules described in Section 2." },
                { clause: "4.4", text: "Nothing in this Policy is intended to excuse the Company from fulfilling the services and responsibilities expressly agreed upon with the Client." },
            ],
        },
        {
            id: "how-to-cancel",
            title: "How to Cancel a Project",
            body: [
                { clause: "5.1", text: "Clients who wish to discontinue a project must submit their cancellation request in writing through the Company's designated communication or customer support channels." },
                { clause: "5.2", text: "The request should clearly state the relevant project details and confirm the Client's intention to terminate the requested services." },
                { clause: "5.3", text: "After receiving a cancellation request, the Company may examine the following information:" },
                {
                    list: [
                        { text: "The official project onboarding date and time." },
                        { text: "The date and time the written cancellation request was received." },
                        { text: "The services that have been initiated, performed, or completed." },
                        { text: "Any deliverables already provided, submitted, or approved by the Client." },
                        { text: "Expenses paid to third parties, existing financial commitments, and other charges that cannot reasonably be recovered." },
                    ],
                },
                { clause: "5.4", text: "Any refund entitlement and the amount payable, if applicable, will be determined in accordance with this Policy, the relevant service agreement, and applicable legal requirements." },
            ],
        },
        {
            id: "revisions-and-disputes",
            title: "Revisions, Client Concerns, and Service Disagreements",
            body: [
                { clause: "6.1", text: `${COMPANY} aims to deliver all work according to the project scope, specifications, and requirements mutually agreed upon with the Client.` },
                { clause: "6.2", text: "If a Client has concerns about a submitted service or deliverable, they should notify the Company in writing and clearly explain the issue, including the corrections or adjustments being requested." },
                { clause: "6.3", text: "Revisions included in the original service package will be handled according to the revision allowance, scope, and limitations established in the applicable service agreement." },
                { clause: "6.4", text: "A Client's dissatisfaction with completed work, a change in personal taste, or a decision to pursue a different creative direction will not, on its own, create an automatic right to a refund." },
                { clause: "6.5", text: "Any genuine disagreement regarding the quality, scope, or delivery of services will be reviewed fairly and in good faith, with consideration given to the Company's contractual responsibilities and applicable legal requirements." },
            ],
        },
        {
            id: "taxes-and-deductions",
            title: "Taxes and Other Required Deductions",
            body: [
                { clause: "7.1", text: "Refunds approved by the Company may be subject to applicable taxes, statutory withholdings, and other financial adjustments required by law." },
                { clause: "7.2", text: "Where legally permitted, applicable taxes, unrecoverable tax charges, or mandatory deductions may be subtracted from the approved refund before the remaining balance is paid to the Client." },
                { clause: "7.3", text: "The Client understands that the final amount received may be different from the initially calculated refund because of applicable tax obligations or legally required deductions." },
                { clause: "7.4", text: "All deductions will be determined and applied in accordance with relevant tax regulations and statutory requirements. No deduction will be made where it is prohibited by applicable law." },
            ],
        },
        {
            id: "third-party-expenses",
            title: "Third-Party Expenses and External Providers",
            body: [
                { clause: "8.1", text: "Certain publishing and production projects may involve external companies, platforms, or service providers. These may include publishing platforms, distributors, printing companies, advertising services, registration authorities, and other independent vendors." },
                { clause: "8.2", text: "Amounts already paid to these providers, or expenses that the Company has become financially obligated to pay, may be non-recoverable. Where permitted by law, such costs may therefore be excluded from the amount eligible for a refund." },
                { clause: "8.3", text: "Any relevant third-party expenses will be considered when reviewing a cancellation or refund application. The Client may request clarification regarding deductions associated with such costs." },
            ],
        },
        {
            id: "refund-review",
            title: "Refund Review and Payment Process",
            body: [
                { clause: "9.1", text: "All refund applications must undergo a review process before approval can be granted." },
                { clause: "9.2", text: "Once approved, the refund will ordinarily be returned through the original payment method, wherever this is reasonably possible." },
                { clause: "9.3", text: "The time required for a refund to appear in the Client's account may vary according to the payment service, bank, transaction method, and any verification procedures required by the relevant financial institution." },
                { clause: "9.4", text: "The Company will inform the Client of the outcome of the review and communicate the approved refund amount, if a refund is granted." },
                { clause: "9.5", text: "The Company will not be responsible for processing delays caused solely by banks, payment gateways, or other external financial service providers, provided that the Company has properly initiated the approved refund." },
            ],
        },
        {
            id: "refund-request-information",
            title: "Information Required for Refund Requests",
            body: [
                { clause: "10.1", text: "All requests concerning cancellations or refunds must be submitted in writing through the Company's designated support channels." },
                { clause: "10.2", text: "To help the Company verify and assess the request, the Client should provide the following information:" },
                {
                    list: [
                        { text: "Full name and current contact details." },
                        { text: "Order identification number or project reference, if available." },
                        { text: "Description of the service or package purchased." },
                        { text: "Official project onboarding date, if known." },
                        { text: "Explanation of the reason for requesting cancellation or a refund." },
                        { text: "Payment receipt, confirmation, or transaction reference." },
                    ],
                },
                { clause: "10.3", text: "The Company may request further information where reasonably necessary to confirm the payment, identify the project, or properly evaluate the Client's request." },
            ],
        },
        {
            id: "policy-changes",
            title: "Changes to This Policy",
            body: [
                { clause: "11.1", text: `${COMPANY} may revise or update this Policy when necessary to reflect changes in its operations, services, contractual practices, or applicable legal requirements.` },
                { clause: "11.2", text: "Any updated version will be made available through the Company's official website and will display its corresponding effective date." },
                { clause: "11.3", text: "Changes to this Policy will not be applied retroactively in a manner that removes rights or obligations already established under an existing service agreement or applicable law." },
                { clause: "11.4", text: "The version applicable to a particular purchase or project will be determined in accordance with the relevant contractual provisions and governing legal requirements." },
            ],
        },
        {
            id: "applicable-law",
            title: "Applicable Law and Legal Provisions",
            body: [
                { clause: "12.1", text: "This Policy shall be read and applied together with the applicable service agreement and the laws governing the relevant transaction." },
                { clause: "12.2", text: "If any part of this Policy is inconsistent with a mandatory legal provision or consumer protection requirement, the applicable legal requirement will take precedence." },
                { clause: "12.3", text: "Should any provision of this Policy be declared invalid, unlawful, or unenforceable, the remaining provisions will continue to apply to the fullest extent permitted by law." },
            ],
        },
        {
            id: "contact-and-support",
            title: "Contact and Support",
            body: [
                { clause: "13.1", text: `For questions about this Policy, requests for clarification, project cancellations, or refund-related matters, Clients may contact ${COMPANY} using the official contact details provided on the Company's website, also listed below.` },
            ],
        },
        {
            id: "acknowledgment",
            title: "Acknowledgment and Acceptance",
            body: [
                `By purchasing, confirming, or authorizing any service offered by ${COMPANY}, the Client acknowledges having been given the opportunity to review this Refund and Cancellation Policy and understand the conditions described herein.`,
                "Acceptance of this Policy and the applicable service agreement remains subject to all rights, protections, and remedies available to the Client under applicable law.",
            ],
        },
    ],
};