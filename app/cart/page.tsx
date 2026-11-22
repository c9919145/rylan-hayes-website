import { pageMetadata } from "@/lib/metadata";
import { CartView } from "@/components/cart/CartView";

export const metadata = pageMetadata({
  title: "Cart",
  description: "Review the items in your Rylan Hayes store cart.",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return <CartView />;
}
