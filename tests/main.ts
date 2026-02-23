
import { BookingPage } from "./pages/BookingPage";
import { AgodaPage } from "./pages/AgodaPage";
import { findLowestPrice } from "./services/PriceComparator";
import { launchBrowser } from "./utils/BrowserFactory";

async function run() {
  const results = [];

  // Booking
  {
    const { browser, page } = await launchBrowser();
    const booking = new BookingPage(page);

    await booking.searchHotel();
    const price = await booking.getTopHotelPrice();

    results.push({ site: "Booking.com", price });

    await browser.close();
  }

  // Agoda
  {
    const { browser, page } = await launchBrowser();
    const agoda = new AgodaPage(page);

    await agoda.searchHotel();
    const price = await agoda.getTopHotelPrice();

    results.push({ site: "Agoda", price });

    await browser.close();
  }

  const lowest = findLowestPrice(results);

  console.log("Lowest Price Found:");
  console.log(`Site: ${lowest.site}`);
  console.log(`Price: ₹${lowest.price}`);
}

run();