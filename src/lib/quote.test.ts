import { describe, expect, it, beforeEach } from "vitest";
import { normalizeQty, quote } from "./quote";
import { publicProducts, MIN_ORDER } from "./catalog";

describe("pedido mínimo de 50 piezas", () => {
  beforeEach(() => quote.clear());
  it("minimum is 50", () => expect(MIN_ORDER).toBe(50));
  it("raises quantities below 50 to 50", () => expect(normalizeQty(10)).toBe(50));
  it("adding a product defaults to 50 pieces", () => {
    quote.add("p1");
    expect(quote.get()[0]?.qty).toBe(50);
  });
  it("cannot set a quantity under 50", () => {
    quote.add("p1");
    quote.setQty("p1", 20);
    expect(quote.get()[0]?.qty).toBe(50);
  });
  it("hides products with less than 50 in stock", () => {
    expect(publicProducts.every((p) => p.stock >= 50)).toBe(true);
  });
});
