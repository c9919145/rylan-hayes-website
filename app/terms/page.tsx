import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { LegalLayout } from "@/components/site/LegalLayout";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "The terms that govern your use of the Rylan Hayes website and store.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      updated="November 1, 2026"
      intro="These terms govern your use of rylanhayes.com and any purchase made through the store. By using the site, you agree to them."
    >
      <h2>1. Use of this site</h2>
      <p>
        This site is provided for personal, non-commercial use. You agree not to misuse the site,
        attempt to disrupt it, scrape it at scale, or use it in violation of any applicable law.
      </p>

      <h2>2. Demonstration storefront</h2>
      <p>
        The store on this site is a portfolio demonstration. Orders placed through the checkout are
        recorded in a local database so the flow can be evaluated, but no payment is captured and
        no goods will be shipped. Card details entered in the demo checkout are used only to
        validate the form and are not stored.
      </p>

      <h2>3. Orders and pricing</h2>
      <p>
        All prices are shown in U.S. dollars. We reserve the right to correct pricing errors, limit
        quantities, or decline an order. Where a live store is enabled, an order is accepted only
        when payment is authorized and a confirmation is issued.
      </p>

      <h2>4. Payment</h2>
      <p>
        A production version of this store would process payments through a PCI-compliant payment
        provider. This demonstration does not transmit card data to any payment network and does
        not create a charge.
      </p>

      <h2>5. Shipping and returns</h2>
      <p>
        Where physical goods are sold, orders ship from Nashville within two business days.
        Standard shipping takes 4–7 business days and is free on U.S. orders over $75. Unworn
        apparel and unopened music items may be returned within 30 days of delivery. Limited,
        signed and personalized items are final sale.
      </p>

      <h2>6. Merchandise and availability</h2>
      <p>
        Product images are representative. Limited editions, hand-pulled prints and signed items
        may sell out without notice. Colors may appear slightly different depending on your screen.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        All content on this site — including text, artwork, photography, logos and design — is owned
        by or licensed to Rylan Hayes and may not be reproduced, distributed or used commercially
        without written permission. Artist names, album titles and song titles are original works
        of fiction created for this demonstration.
      </p>

      <h2>8. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Submit false, misleading or unlawful information through any form.</li>
        <li>Interfere with the security or operation of the site.</li>
        <li>Use automated means to access the site in a way that imposes an unreasonable load.</li>
        <li>Infringe the rights of any person or entity.</li>
      </ul>

      <h2>9. Third-party links</h2>
      <p>
        The site links to third-party services such as streaming platforms, ticket sellers and
        social networks. We do not control those services and are not responsible for their
        content, availability or privacy practices. Your use of them is governed by their own
        terms.
      </p>

      <h2>10. Disclaimers</h2>
      <p>
        The site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of
        any kind, express or implied, including fitness for a particular purpose. Tour dates,
        venues and lineups are subject to change.
      </p>

      <h2>11. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Rylan Hayes and his team will not be liable for any
        indirect, incidental, special or consequential damages arising from your use of the site or
        any purchase made through it.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Tennessee, without regard to conflict
        of law principles. Any dispute will be brought in the state or federal courts located in
        Davidson County, Tennessee.
      </p>

      <h2>13. Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the site after changes are
        posted constitutes acceptance of the revised terms.
      </p>

      <h2>14. Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or use the{" "}
        <Link href="/contact">contact form</Link>.
      </p>
    </LegalLayout>
  );
}
