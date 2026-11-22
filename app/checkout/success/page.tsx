import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { getDb, type OrderItemRow, type OrderRow } from "@/lib/db";
import { formatOrderDate, formatPrice } from "@/lib/format";
import { shippingMethods } from "@/lib/cart-math";
import { productBySlug } from "@/lib/products";
import { ProductVisual } from "@/components/store/ProductVisual";
import { Icon } from "@/components/ui/Icon";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Order confirmed",
  description: "Thank you for your order.",
  path: "/checkout/success",
  noIndex: true,
});

interface SuccessPageProps {
  searchParams: Promise<{ order?: string | string[] }>;
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const orderNumber = typeof params.order === "string" ? params.order : "";

  let order: OrderRow | undefined;
  let items: OrderItemRow[] = [];

  if (orderNumber) {
    const db = getDb();
    order = db
      .prepare("SELECT * FROM orders WHERE order_number = ?")
      .get(orderNumber) as OrderRow | undefined;
    if (order) {
      items = db
        .prepare("SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC")
        .all(order.id) as OrderItemRow[];
    }
  }

  if (!order) {
    return (
      <section className="flex min-h-[70vh] items-center bg-ink pb-20 pt-32">
        <div className="container-x">
          <div className="mx-auto max-w-lg border border-line bg-ink-2 p-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-line text-gold">
              <Icon name="search" size={24} />
            </span>
            <h1 className="mt-5 font-display text-3xl text-cream">Order not found</h1>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-cream-2">
              We couldn&apos;t find that order. If you just placed one, check the confirmation
              email for your order number, or contact us and we&apos;ll sort it out.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/store" className="btn btn-gold">
                Back to the store
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const shipping =
    shippingMethods.find((method) => method.id === order.shipping_method) ??
    shippingMethods[0];

  return (
    <section className="bg-ink pb-20 pt-32 md:pt-36">
      <div className="container-x">
        <div className="mx-auto max-w-3xl">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink">
            <Icon name="check" size={26} />
          </span>
          <p className="eyebrow mt-6">Order confirmed</p>
          <h1 className="display mt-3 text-[clamp(2.8rem,6vw,5rem)] text-cream">
            Thank you, {order.first_name}.
          </h1>
          <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-cream-2">
            Your order has been recorded for <span className="text-cream">{order.email}</span>.
            This is a portfolio demo, so no payment was taken and no confirmation email is sent —
            your order details are shown below.
          </p>
          <p className="mt-3 font-condensed text-[0.66rem] uppercase tracking-[0.2em] text-cream-3">
            Order {order.order_number} · {formatOrderDate(order.created_at)}
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-[1.3fr_0.9fr]">
            <div className="border border-line bg-ink-2">
              <div className="border-b border-line px-5 py-4">
                <h2 className="font-display text-xl text-cream">Your items</h2>
              </div>
              <ul className="divide-y divide-line">
                {items.map((item) => {
                  const product = productBySlug(item.product_slug);
                  return (
                    <li key={item.id} className="flex gap-4 px-5 py-4">
                      <div className="w-16 shrink-0 overflow-hidden border border-line">
                        {product ? (
                          <ProductVisual
                            visual={product.visual}
                            name={item.product_name}
                            uid={`order-${item.id}`}
                          />
                        ) : (
                          <div className="aspect-square bg-ink-3" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.86rem] leading-snug text-cream">
                          {item.product_name}
                        </p>
                        {item.variant && (
                          <p className="mt-0.5 font-condensed text-[0.56rem] uppercase tracking-[0.16em] text-cream-3">
                            {item.variant}
                          </p>
                        )}
                        <p className="mt-1 text-[0.74rem] text-cream-3">
                          Qty {item.quantity} · {formatPrice(item.unit_price)} each
                        </p>
                      </div>
                      <span className="text-[0.84rem] tabular-nums text-cream">
                        {formatPrice(item.line_total)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="space-y-2 border-t border-line px-5 py-4 text-[0.84rem]">
                <div className="flex justify-between">
                  <span className="text-cream-2">Subtotal</span>
                  <span className="tabular-nums text-cream">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream-2">Shipping</span>
                  <span className="tabular-nums text-cream">
                    {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream-2">Tax</span>
                  <span className="tabular-nums text-cream">{formatPrice(order.tax)}</span>
                </div>
                <div className="flex items-baseline justify-between border-t border-line pt-3">
                  <span className="font-condensed text-[0.68rem] uppercase tracking-[0.18em] text-cream-2">
                    Total
                  </span>
                  <span className="font-display text-2xl text-cream">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border border-line bg-ink-2 p-5">
                <h2 className="font-condensed text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-cream-2">
                  Shipping to
                </h2>
                <address className="mt-3 text-[0.86rem] not-italic leading-relaxed text-cream-2">
                  {order.first_name} {order.last_name}
                  <br />
                  {order.address1}
                  {order.address2 && (
                    <>
                      <br />
                      {order.address2}
                    </>
                  )}
                  <br />
                  {order.city}, {order.state} {order.postal_code}
                  <br />
                  {order.country}
                </address>
                <p className="mt-4 border-t border-line pt-3 text-[0.76rem] text-cream-3">
                  {shipping.label} · {shipping.detail}
                </p>
              </div>

              <div className="border border-gold/30 bg-gold/[0.05] p-5">
                <p className="text-[0.78rem] leading-relaxed text-cream-2">
                  <span className="font-semibold text-gold">Demo order.</span> This storefront is
                  a demonstration — your order was recorded, but no payment was processed and no
                  charge will appear on your card.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/store" className="btn btn-gold">
              Continue shopping
              <Icon name="arrow-right" size={15} />
            </Link>
            <Link href="/" className="btn btn-outline">
              Back home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
