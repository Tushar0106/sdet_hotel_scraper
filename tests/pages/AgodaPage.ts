import { Page } from "playwright";
import { BasePage } from "./BasePage";
import { testData } from "../config/dateData";

export class AgodaPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async searchHotel() {
    await this.navigate("https://www.agoda.com");

    await this.page.fill('input[placeholder="Enter a destination"]', testData.city);
    await this.page.keyboard.press("Enter");

    await this.page.waitForLoadState("networkidle");
  }

  async getTopHotelPrice(): Promise<number> {
    const firstHotel = this.page.locator(".PropertyCard").first();

    const priceText = await firstHotel
      .locator(".PropertyCardPrice")
      .innerText();

    const price = parseInt(priceText.replace(/[^\d]/g, ""));

    return price;
  }
}