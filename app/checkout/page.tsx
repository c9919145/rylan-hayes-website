import { pageMetadata } from "@/lib/metadata";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata = pageMetadata({
  title: "Checkout",
  description: "Complete your Rylan Hayes store order.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return <CheckoutForm />;
}
