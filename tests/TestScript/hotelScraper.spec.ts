import { test } from "@playwright/test";
import { BookingPage } from "../pages/BookingPage";
import { findLowestPrice } from "../services/PriceComparator";

test("Find lowest price for 5-star hotel", async ({ browser }) => {
  const results: { site: string; price: number }[] = [];

  const page = await browser.newPage();
  const booking = new BookingPage(page);

  await booking.searchHotel();
  const price = await booking.getTopHotelPrice();

  results.push({ site: "Booking.com", price });

  await page.close();

  const lowest = findLowestPrice(results);

  console.log("\n===== FINAL RESULT =====");
  console.log(`Lowest Price Site: ${lowest.site}`);
  console.log(`Price: ₹${lowest.price}`);
});