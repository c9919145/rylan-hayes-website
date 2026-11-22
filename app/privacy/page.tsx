import { pageMetadata } from "@/lib/metadata";
import { LegalLayout } from "@/components/site/LegalLayout";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Rylan Hayes collects, uses and protects your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="November 1, 2026"
      intro="This policy explains what information we collect when you visit rylanhayes.com, why we collect it, and the choices you have. We keep it simple and we don't sell your data."
    >
      <h2>1. Information we collect</h2>
      <p>We collect information you choose to give us, including:</p>
      <ul>
        <li>
          <strong>Mailing list signups:</strong> your first name, email address, optional postal
          code and your consent to receive email updates.
        </li>
        <li>
          <strong>Store orders:</strong> your name, email, shipping address, order contents and
          order total. Payment card details submitted through this demonstration checkout are
          validated in transit but are not stored.
        </li>
        <li>
          <strong>Contact messages:</strong> your name, email, selected topic and message.
        </li>
        <li>
          <strong>Cart data:</strong> the items in your cart are stored in your browser&apos;s local
          storage so the cart survives a page refresh. This data stays on your device.
        </li>
      </ul>

      <h2>2. How we use your information</h2>
      <p>We use the information you provide to:</p>
      <ul>
        <li>Send the email updates you asked for, including tour news and presale codes.</li>
        <li>Process and fulfill store orders and respond to order questions.</li>
        <li>Reply to contact messages and booking or press inquiries.</li>
        <li>Maintain the security and reliability of the site.</li>
      </ul>
      <p>
        We do not sell, rent or trade your personal information. We only send marketing email to
        people who have explicitly opted in.
      </p>

      <h2>3. Cookies and local storage</h2>
      <p>
        This site does not use advertising cookies or third-party analytics trackers. We use your
        browser&apos;s local storage for one purpose: remembering your shopping cart between visits.
        You can clear this at any time through your browser settings.
      </p>
      <p>
        Embedded videos are served by YouTube in privacy-enhanced mode. When you play a video,
        YouTube may set cookies or collect data under its own privacy policy.
      </p>

      <h2>4. When we share information</h2>
      <p>
        We share information only with service providers that help us operate the site — for
        example, email delivery, hosting and payment processing — and only to the extent needed to
        provide those services. We may also disclose information if required by law or to protect
        our legal rights.
      </p>

      <h2>5. How long we keep information</h2>
      <p>
        Mailing list records are kept until you unsubscribe or ask us to delete them. Order records
        are kept as long as needed for accounting, tax and customer-service purposes. Contact
        messages are kept for up to twenty-four months.
      </p>

      <h2>6. Your choices and rights</h2>
      <p>You can:</p>
      <ul>
        <li>Unsubscribe from any email using the link at the bottom of the message.</li>
        <li>Ask us to update or delete the personal information we hold about you.</li>
        <li>Ask what information we hold about you.</li>
      </ul>
      <p>
        To make a request, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. We may need to verify your identity
        before completing a request.
      </p>

      <h2>7. Security</h2>
      <p>
        We use reasonable technical and organizational measures to protect the information we
        hold. No method of transmission or storage is completely secure, so we cannot guarantee
        absolute security.
      </p>

      <h2>8. Children</h2>
      <p>
        This site is not directed at children under 13, and we do not knowingly collect personal
        information from children under 13. If you believe a child has provided us information,
        contact us and we will delete it.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. When we do, we will revise the date at the top
        of this page. Material changes will be communicated to mailing list members by email.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or write to us at {site.location}.
      </p>
    </LegalLayout>
  );
}
